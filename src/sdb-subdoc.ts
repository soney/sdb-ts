import * as ShareDB from 'sharedb';
import { SDBDoc, Subscriber } from './sdb-doc';
import { OpSubmittable } from './OpSubmittable';
import { extend } from './utils';

export class SDBSubDoc<E> extends OpSubmittable {
    private subscriptionShims: Map<Subscriber<E>, Subscriber<E>[]> = new Map();
    constructor(private doc: SDBDoc<any>, private path: Array<string|number>) {
        super();
    };
    public subscribe(callback:Subscriber<E> = ()=>null):Promise<void> {
        const shimmedCB: Subscriber<E> = (eventType: string, ops: ShareDB.Op[], source: any, data: any) => {
            if (eventType === 'op') {
                const relOps: {op: ShareDB.Op, rp: (string|number)[]}[] = [];
                ops.forEach((op: ShareDB.Op) => {
                    const rp = SDBDoc.relative(this.path, op.p);
                    if(rp) {
                        relOps.push({op, rp});
                    }
                });
                if (relOps.length > 0) {
                    const newOps = relOps.map(({ op, rp }) =>  extend( {}, op, {p: rp}) );
                    if(callback) {
                        callback(eventType, newOps, source, this.getData());
                    }
                }
            } else {
                if(callback) {
                    callback(eventType, ops, source, this.getData());
                }
            }
        };
        if(this.subscriptionShims.has(callback)) {
            this.subscriptionShims.set(callback, this.subscriptionShims.get(callback).concat([shimmedCB]));
        } else {
            this.subscriptionShims.set(callback, [shimmedCB]);
        }
        return this.doc.subscribe(shimmedCB);
    }
    public unsubscribe(callback: Subscriber<E>): void {
        if(this.subscriptionShims.has(callback)) {
            const shimmedCB: Subscriber<E>[] = this.subscriptionShims.get(callback);
            shimmedCB.forEach((cb) => this.doc.unsubscribe(cb));
            this.subscriptionShims.delete(callback);
        }
    }
    public getData(): E {
        try {
            return this.doc.traverse(this.path) as E;
        } catch (e) {
            return null;
        }
    }
    public async submitOp(ops:Array<ShareDB.Op>, source:any=true):Promise<this> {
        const absOps = ops.map((op: ShareDB.Op) => extend({}, op, {p: this.path.concat(op.p)}));
        await this.doc.submitOp(absOps, source);
        return this;
    };
    public traverse(path:Array<string|number>):any {
        return this.doc.traverse(this.path.concat(path));
    };
}