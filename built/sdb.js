"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShareDB = require("sharedb");
const sdb_doc_1 = require("./sdb-doc");
class SDB {
    constructor() {
        this.docs = new Map();
    }
    getDocIdentifier(collectionName, documentID) {
        return [collectionName, documentID];
    }
    ;
    get(collectionName, documentID) {
        const docIdentifier = this.getDocIdentifier(collectionName, documentID);
        let sdbDoc;
        if (this.docs.has(docIdentifier)) {
            sdbDoc = this.docs.get(docIdentifier);
        }
        else {
            const doc = this.connection.get(collectionName, documentID);
            sdbDoc = new sdb_doc_1.SDBDoc(docIdentifier, doc, this);
            this.docs.set(docIdentifier, sdbDoc);
        }
        return sdbDoc;
    }
    ;
    static registerType(type) { ShareDB.types.register(type); }
    ;
    deleteDoc(doc) {
        this.docs.delete(doc.getIdentifier());
    }
    ;
}
exports.SDB = SDB;
;
//# sourceMappingURL=sdb.js.map