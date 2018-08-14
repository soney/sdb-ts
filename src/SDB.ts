import * as ShareDB from 'sharedb';
import { DocIdentifier, SDBDoc } from './SDBDoc';

export abstract class SDB {
    private readonly docs:Map<DocIdentifier, SDBDoc<any>> = new Map<DocIdentifier, SDBDoc<any>>();
    protected connection:ShareDB.Connection; // The actual connection object

    // Implemented by subclasses
    constructor() { }

    // Convert a collection name and doc id into an array
    private getDocIdentifier(collectionName:string, documentID:string):DocIdentifier {
        return [collectionName, documentID];
    };

    /**
     * Get a document for this connection. (note that to create a new document, you call `.get()` and *then* `.create()` or `.createIfEmpty()` on that doc)
     * @param collectionName The collection ID
     * @param documentID The document ID
     */
    public get<E>(collectionName:string, documentID:string):SDBDoc<E> {
        const docIdentifier:DocIdentifier = this.getDocIdentifier(collectionName, documentID);
        let sdbDoc:SDBDoc<E>;
        if(this.docs.has(docIdentifier)) {
            sdbDoc = this.docs.get(docIdentifier);
        } else {
            const doc:ShareDB.Doc = this.connection.get(collectionName, documentID);
            sdbDoc = new SDBDoc<E>(docIdentifier, doc, this);
            this.docs.set(docIdentifier, sdbDoc);
        }
        return sdbDoc;
    };

    /**
     * Register a new ShareDB.OT type (see [https://github.com/ottypes/docs](https://github.com/ottypes/docs))
     * @param type The type object
     */
    public static registerType(type:any):void { ShareDB.types.register(type); };

    /**
     * Close the connection (implemented by `SDBServer` and `SDBClient`)
     */
    public abstract close():Promise<void>;

    /**
     * Delete a document from the list of documents (note this does not delete the document itself; it just cleans up some memory in the wrapper).
     * You should not call this method; it will be automatically called by the document.
     * @param doc The document to delete
     */
    public deleteDoc(doc:SDBDoc<any>):void {
        this.docs.delete(doc.getIdentifier());
    };
};

