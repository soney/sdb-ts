import { SDBDoc } from './sdb-doc';
import * as ShareDB from 'sharedb';
import { extend } from 'lodash';
import { OpSubmittable } from './OpSubmittable';

export class SDBSubDoc<E> extends OpSubmittable {
    constructor(private doc: SDBDoc<any>, private path: Array<string|number>) {
        super();
    };
    public subscribe(callback?:(eventType:string, ops:Array<ShareDB.Op>, source:any, data:E)=>void):()=>void {
        const unsubscribe = this.doc.subscribe((eventType: string, ops: ShareDB.Op[], source: any, data: any) => {
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
        });
        return unsubscribe;
    };
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