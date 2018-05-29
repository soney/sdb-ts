import * as ShareDB from 'sharedb';
import { SDBDoc } from './sdb-doc';
export declare abstract class SDB {
    private readonly docs;
    protected connection: ShareDB.Connection;
    constructor();
    private getDocIdentifier(collectionName, documentID);
    get<E>(collectionName: string, documentID: string): SDBDoc<E>;
    static registerType(type: any): void;
    abstract close(): Promise<void>;
    deleteDoc(doc: SDBDoc<any>): void;
}
