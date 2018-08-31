import * as ShareDB from 'sharedb';
import { SDBDoc, Subscriber } from './SDBDoc';
import { OpSubmittable } from './OpSubmittable';
import { extend } from './utils';

export class SDBSubDoc<E> extends OpSubmittable {
    private subscriptionShims: Map<Subscriber<E>, Subscriber<E>[]> = new Map();
    constructor(private doc: SDBDoc<any>, private path: ShareDB.Path) {
        super();
    };
    /**
     * Signal that we want to listen to changes in this sub-document. Note that we don't fetch new versions unless the document is being
     * subscribed to
     * 
     * @param subscriber A callback function that accepts three parameters:
     * - `type`: `null` if we are fetching the initial version, `'create'` if the document was created, or `'op'` if an operation happened
     * - `ops`: The raw ShareDB operations (`null` if `type` is not `'op'`)
     * - `source`: The local source if passed in (`null` otherwise)
     * - `data`: The current document snapshot
     * @returns a promise that resolves when we have an initial snapshot of the sub-document
     */
    public subscribe(callback:Subscriber<E> = ()=>null):Promise<void> {
        const shimmedCB: Subscriber<E> = (eventType: string | null, ops: ReadonlyArray<ShareDB.Op> | null, source: any, data: any) => {
            if (eventType === 'op') {
                const relOps: {op: ShareDB.Op, rp: ShareDB.Path}[] = [];
                (ops as ReadonlyArray<ShareDB.Op>).forEach((op: ShareDB.Op) => {
                    const rp = SDBDoc.relative(this.path, op.p);
                    if(rp) {
                        relOps.push({op, rp});
                    }
                });
                if (relOps.length > 0) {
                    const newOps = relOps.map(({ op, rp }) => ( extend( {}, op, {p: rp}) as ShareDB.Op ) );
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
            this.subscriptionShims.set(callback, (this.subscriptionShims.get(callback) as Subscriber<E>[]).concat([shimmedCB]));
        } else {
            this.subscriptionShims.set(callback, [shimmedCB]);
        }
        return this.doc.subscribe(shimmedCB);
    }
    /**
     * Unsubscribe from changes to this document
     * @param callback The callback to unsubscribe
     */
    public unsubscribe(callback: Subscriber<E>): void {
        if(this.subscriptionShims.has(callback)) {
            const shimmedCB: Subscriber<E>[] = this.subscriptionShims.get(callback) as Subscriber<E>[];
            shimmedCB.forEach((cb) => this.doc.unsubscribe(cb));
            this.subscriptionShims.delete(callback);
        }
    }
    /**
     * Get the data in this sub-document
     */
    public getData(): E | null {
        try {
            return this.doc.traverse(this.path) as E;
        } catch (e) {
            return null;
        }
    }

    /**
     * Submit a raw series of ShareDB operations. Note that all paths should be relative to this subdoc
     * @param ops The raw operations
     * @param source (optional) the change source
     */
    protected async doSubmitOp(ops:ReadonlyArray<ShareDB.Op>, source:any=true):Promise<this> {
        const absOps = ops.map((op: ShareDB.Op) => (extend({}, op, {p: this.path.concat(op.p)}) as ShareDB.Op));
        await this.doc.submitOp(absOps, source);
        return this;
    };
    /**
     * Get the value at a given location in the document. Note that this is relative to this subdocument
     * @param path The path array
     */
    public traverse(path:ShareDB.Path):any {
        return this.doc.traverse(this.path.concat(path));
    };
}