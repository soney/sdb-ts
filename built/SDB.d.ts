import * as ShareDB from 'sharedb';
import { SDBDoc } from './SDBDoc';
import { Type } from 'sharedb/lib/sharedb';
export declare abstract class SDB {
    private readonly docs;
    protected connection: ShareDB.Connection;
    constructor();
    private getDocIdentifier;
    /**
     * Get a document for this connection. (note that to create a new document, you call `.get()` and *then* `.create()` or `.createIfEmpty()` on that doc)
     * @param collectionName The collection ID
     * @param documentID The document ID
     */
    get<E>(collectionName: string, documentID: string): SDBDoc<E>;
    /**
     * Register a new ShareDB.OT type (see [https://github.com/ottypes/docs](https://github.com/ottypes/docs))
     * @param type The type object
     */
    static registerType(type: Type): void;
    /**
     * Close the connection (implemented by `SDBServer` and `SDBClient`)
     */
    abstract close(): Promise<void>;
    /**
     * Delete a document from the list of documents (note this does not delete the document itself; it just cleans up some memory in the wrapper).
     * You should not call this method; it will be automatically called by the document.
     * @param doc The document to delete
     */
    deleteDoc(doc: SDBDoc<any>): void;
    /**
     * Gets the raw ShareDB connection object
     */
    __connection__(): ShareDB.Connection;
}
