import * as ShareDB from 'sharedb';
import { SDBDoc, Subscriber } from './sdb-doc';
import { OpSubmittable } from './OpSubmittable';
export declare class SDBSubDoc<E> extends OpSubmittable {
    private doc;
    private path;
    private subscriptionShims;
    constructor(doc: SDBDoc<any>, path: Array<string | number>);
    subscribe(callback?: Subscriber<E>): Promise<void>;
    unsubscribe(callback: Subscriber<E>): void;
    getData(): E;
    submitOp(ops: Array<ShareDB.Op>, source?: any): Promise<this>;
    traverse(path: Array<string | number>): any;
}
