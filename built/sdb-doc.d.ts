import * as ShareDB from 'sharedb';
import { SDB } from './sdb';
import { SDBSubDoc } from './sdb-subdoc';
import { OpSubmittable } from './OpSubmittable';
export declare type DocIdentifier = [string, string];
export declare type Subscriber<E> = (eventType: string, ops: Array<ShareDB.Op>, source: any, data: E) => void;
export declare class SDBDoc<E> extends OpSubmittable {
    private docIdentifier;
    private doc;
    private sdb;
    constructor(docIdentifier: DocIdentifier, doc: ShareDB.Doc, sdb: SDB);
    private subscribers;
    subDoc<T>(path: Array<string | number>): SDBSubDoc<T>;
    getIdentifier(): DocIdentifier;
    getData(): E;
    traverse(path: Array<string | number>): any;
    static relative(from: Array<string | number>, to: Array<string | number>): Array<string | number>;
    fetch(): Promise<ShareDB.Doc>;
    create(data: E, type?: any, options?: any): Promise<this>;
    del(source?: any): Promise<void>;
    private removeSubscriber(subscriber);
    private onOp;
    private onCreate;
    subscribe(subscriber?: Subscriber<E>): () => void;
    submitOp(ops: Array<ShareDB.Op>, source?: any): Promise<this>;
    createIfEmpty(data: E, type?: any, options?: any): Promise<this>;
    destroy(): void;
}
