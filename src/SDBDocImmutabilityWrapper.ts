import update from 'immutability-helper';
import { Op, AddNumOp, ListReplaceOp, ListInsertOp, ObjectInsertOp, ListMoveOp, StringInsertOp, StringDeleteOp } from 'sharedb';
import { SDBDoc, Subscriber } from './SDBDoc';
import { SDBSubDoc } from './SDBSubDoc';

enum OP {
    NUMADD,      SUBTYPE,
    LISTINSERT,   LISTDELETE, LISTREPLACE, LISTMOVE,
    OBJINSERT,    OBJDELETE,  OBJREPLACE,
    STRINGINSERT, STRINGDELETE
}

export class ImmutabilityWrapper<E> {
    private data: E|null = null;
    private subscriptionFn: Subscriber<E>;
    private isSubscribed: boolean = false;

    public constructor(private doc: SDBDoc<E>|SDBSubDoc<E>) {
        this.data = ImmutabilityWrapper.deepClone(this.doc.getData());
        this.subscribeToDoc();
    }

    public getData(): E|null {
        return this.data;
    }

    public async resubscribe(): Promise<void> {
        if(!this.isSubscribed) {
            await this.doc.subscribe(this.subscriptionFn);
            this.isSubscribed = true;
        }
    }

    public unsubscribe(): void {
        if(this.isSubscribed) {
            this.doc.unsubscribe(this.subscriptionFn);
            this.isSubscribed = false;
        }
    }

    private async subscribeToDoc(): Promise<void> {
        this.subscriptionFn = (eventType, ops) => {
            if(eventType === null) {
                this.data = ImmutabilityWrapper.deepClone(this.doc.getData());
            } else if(eventType === 'create') {
                this.data = ImmutabilityWrapper.deepClone(this.doc.getData());
            } else if(eventType === 'op') {
                ops.forEach((op) => {
                    const { p } = op;
                    
                    if(p.length === 0) { // strange stuff happens when the path length is 0
                        this.data = ImmutabilityWrapper.deepClone(this.doc.getData());
                    } else {
                        this.data = ImmutabilityWrapper.getUpdatedData<E>(this.data, op);
                    }
                });
            }
        };

        await this.doc.subscribe(this.subscriptionFn);
        this.isSubscribed = true;
    }

    private static getUpdatedData<E>(previousData: E, op: Op): E {
        const opType = ImmutabilityWrapper.getOpType(op);

        if(opType === OP.SUBTYPE) {
            return this.deepClone(previousData);
        }

        const { p } = op;
        const plen = p.length;

        const updateObject: any = {};
        let currData: any = previousData;
        let currUpdateObject: any = updateObject;

        const buildUpTo = ([OP.OBJDELETE, OP.LISTINSERT, OP.LISTDELETE, OP.LISTREPLACE, OP.LISTMOVE, OP.STRINGINSERT, OP.STRINGDELETE].includes(opType)) ? plen-1 : plen;
        for(let i: number = 0; i<buildUpTo; i++) {
            const pi = p[i];

            if(i === buildUpTo-1) {
                if(opType === OP.NUMADD) {
                    const { na } = op as AddNumOp;
                    currUpdateObject[pi] = { $set: currData[pi]+na };
                } else if(opType === OP.OBJINSERT || opType === OP.OBJREPLACE) {
                    const { oi } = op as ObjectInsertOp;
                    currUpdateObject[pi] = { $set: ImmutabilityWrapper.deepClone(oi) };
                } else if(opType === OP.OBJDELETE) {
                    const piPlusOne = p[i+1];
                    currUpdateObject[pi] = { $unset: [piPlusOne] };
                } else if(opType === OP.LISTINSERT) {
                    const { li } = op as ListInsertOp;
                    const piPlusOne = p[i+1];
                    currUpdateObject[pi] = { $splice: [[piPlusOne, 0, ImmutabilityWrapper.deepClone(li)]] };
                } else if(opType === OP.LISTDELETE) {
                    const piPlusOne = p[i+1];
                    currUpdateObject[pi] = { $splice: [[piPlusOne, 1]] };
                } else if(opType === OP.LISTREPLACE) {
                    const { li } = op as ListReplaceOp;
                    const piPlusOne = p[i+1];
                    currUpdateObject[pi] = { $splice: [[piPlusOne, 1, ImmutabilityWrapper.deepClone(li)]] };
                } else if(opType === OP.LISTMOVE) {
                    const { lm } = op as ListMoveOp;
                    const piPlusOne = p[i+1];
                    const toInsert = ImmutabilityWrapper.deepClone(currData[pi][piPlusOne]);
                    currUpdateObject[pi] = { $splice: [[piPlusOne, 1], [lm, 0, toInsert]] };
                } else if(opType === OP.STRINGINSERT) {
                    const { si } = op as StringInsertOp;
                    const piPlusOne = p[i+1] as number;
                    const existingStr = currData[pi];
                    const newStr = existingStr.substring(0, piPlusOne) + si + existingStr.substring(piPlusOne, existingStr.length);

                    currUpdateObject[pi] = { $set: newStr };
                } else if(opType === OP.STRINGDELETE) {
                    const { sd } = op as StringDeleteOp;
                    const piPlusOne = p[i+1] as number;
                    const existingStr = currData[pi];
                    const newStr = existingStr.substring(0, piPlusOne) + existingStr.substring(piPlusOne + sd.length, existingStr.length);

                    currUpdateObject[pi] = { $set: newStr };
                }
            } else {
                currUpdateObject[pi] = {};
            }

            currUpdateObject = currUpdateObject[pi];
            currData = currData[pi];
        }

        return update(previousData, updateObject);
    }
    private static getOpType(op: Op): OP {
        const ophas = (...propNames): boolean => (
            propNames.every((prop) => op.hasOwnProperty(prop))
        );

        if(ophas('na')) {
            return OP.NUMADD;
        } else if(ophas('t', 'o')) {
            return OP.SUBTYPE;
        } else if(ophas('li', 'ld')) {
            return OP.LISTREPLACE;
        } else if(ophas('li')) {
            return OP.LISTINSERT;
        } else if(ophas('ld')) {
            return OP.LISTDELETE;
        } else if(ophas('lm')) {
            return OP.LISTMOVE;
        } else if(ophas('oi', 'od')) {
            return OP.OBJREPLACE;
        } else if(ophas('oi')) {
            return OP.OBJINSERT;
        } else if(ophas('od')) {
            return OP.OBJDELETE;
        } else if(ophas('si')) {
            return OP.STRINGINSERT;
        } else if(ophas('sd')) {
            return OP.STRINGDELETE;
        } else {
            throw new Error('Could not determine type for op');
        }
    }
    private static deepClone(obj: any): any {
        if(obj === undefined || obj === null) {
            return obj;
        } else {
            return JSON.parse(JSON.stringify(obj));
        }
    }
}