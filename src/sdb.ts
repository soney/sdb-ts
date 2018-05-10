import * as ShareDB from 'sharedb';
import {DocIdentifier, SDBDoc} from './sdb-doc';

export abstract class SDB {
    private readonly docs:Map<DocIdentifier, SDBDoc<any>> = new Map<DocIdentifier, SDBDoc<any>>();
    protected connection:ShareDB.Connection;
    constructor() { }
    private getDocIdentifier(collectionName:string, documentID:string):DocIdentifier {
        return [collectionName, documentID];
    };
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

    public static registerType(type:any):void { ShareDB.types.register(type); };

    public abstract close():Promise<void>;

    public deleteDoc(doc:SDBDoc<any>):void {
        this.docs.delete(doc.getIdentifier());
    };
};

