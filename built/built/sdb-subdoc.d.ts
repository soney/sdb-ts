import { SDBDoc } from './sdb-doc';
import * as ShareDB from 'sharedb';
import { OpSubmittable } from './OpSubmittable';
export declare class SDBSubDoc<E> extends OpSubmittable {
    private doc;
    private path;
    constructor(doc: SDBDoc<any>, path: Array<string | number>);
    subscribe(callback?: (eventType: string, ops: Array<ShareDB.Op>, source: any, data: E) => void): () => void;
    getData(): E;
    submitOp(ops: Array<ShareDB.Op>, source?: any): Promise<this>;
    traverse(path: Array<string | number>): any;
}
