"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShareDB = require("sharedb");
const SDBDoc_1 = require("./SDBDoc");
class SDB {
    // Implemented by subclasses
    constructor() {
        this.docs = new Map();
    }
    // Convert a collection name and doc id into an array
    getDocIdentifier(collectionName, documentID) {
        return [collectionName, documentID];
    }
    ;
    /**
     * Get a document for this connection. (note that to create a new document, you call `.get()` and *then* `.create()` or `.createIfEmpty()` on that doc)
     * @param collectionName The collection ID
     * @param documentID The document ID
     */
    get(collectionName, documentID) {
        const docIdentifier = this.getDocIdentifier(collectionName, documentID);
        let sdbDoc;
        if (this.docs.has(docIdentifier)) {
            sdbDoc = this.docs.get(docIdentifier);
        }
        else {
            const doc = this.connection.get(collectionName, documentID);
            sdbDoc = new SDBDoc_1.SDBDoc(docIdentifier, doc, this);
            this.docs.set(docIdentifier, sdbDoc);
        }
        return sdbDoc;
    }
    ;
    /**
     * Register a new ShareDB.OT type (see [https://github.com/ottypes/docs](https://github.com/ottypes/docs))
     * @param type The type object
     */
    static registerType(type) { ShareDB.types.register(type); }
    ;
    /**
     * Delete a document from the list of documents (note this does not delete the document itself; it just cleans up some memory in the wrapper).
     * You should not call this method; it will be automatically called by the document.
     * @param doc The document to delete
     */
    deleteDoc(doc) {
        this.docs.delete(doc.getIdentifier());
    }
    ;
    __connection__() {
        return this.connection;
    }
}
exports.SDB = SDB;
;
//# sourceMappingURL=SDB.js.map