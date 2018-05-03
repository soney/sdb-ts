import * as ShareDBClient from 'sharedb/lib/client';
import * as ShareDB from 'sharedb';
import * as stream from 'stream';

type DocIdentifier = [string,string];

export class SDB {
    private docs:Map<DocIdentifier, SDBDoc<any>> = new Map<DocIdentifier, SDBDoc<any>>();
    private share:ShareDB|ShareDBClient;
    private connection:ShareDB.Connection;
    constructor(private client:boolean, connection?:WebSocket) {
        if(client) {
            this.connection = new ShareDBClient.Connection(connection);
        } else {
            this.share = new ShareDB();
            this.connection = this.share.connect();
        }
    };

    public isClient():boolean { return this.client; };
    public isServer():boolean { return !this.client; };

    public use(action:ShareDB.Action, fn:ShareDB.UseCallback):void {
        if(this.isServer()) {
            this.share.use(action, fn);
        } else {
            throw new Error("Cannot use middleware for clients");
        }
    };

    private getDocIdentifier(collectionName:string, documentID:string):DocIdentifier {
        return [collectionName, documentID];
    };

    public listen(stream:stream.Duplex):void {
        this.share.listen(stream);
    };

    public get<E>(collectionName:string, documentID:string):SDBDoc<E> {
        const docIdentifier:DocIdentifier = this.getDocIdentifier(collectionName, documentID);
        let sdbDoc:SDBDoc<E>;
        if(this.docs.has(docIdentifier)) {
            sdbDoc = this.docs.get(docIdentifier);
        } else {
            const doc:ShareDB.Doc<E> = this.connection.get(collectionName, documentID);
            sdbDoc = new SDBDoc<E>(docIdentifier, doc, this);
            this.docs.set(docIdentifier, sdbDoc);
        }
        return sdbDoc;
    };

    public close():Promise<void> {
        return new Promise((resolve, reject) => {
            if(this.share) {
                this.share.close(()=> {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    };

    public deleteDoc(doc:SDBDoc<any>):void {
        this.docs.delete(doc.getIdentifier());
    };
};

export class SDBDoc<E> {
    constructor(private docIdentifier:DocIdentifier, private doc:ShareDB.Doc<E>, private sdb:SDB) { };
    public getIdentifier():DocIdentifier { return this.docIdentifier; };
    public getData():E { return this.doc.data; };
    public traverse(path:Array<string|number>):any {
        let x:any = this.getData();
        let prev:any = x;
        for(let i:number = 0; i<path.length; i++) {
            try {
                x = x[path[i]];
                prev = x;
            } catch(e) {
                throw new Error(`Could not traverse path ${path}. Object ${prev} does not have property ${path[i]}`);
            }
        }
        return x;
    };
    public async submitObjectReplaceOp(p:Array<string|number>, oi:any, od:any=this.traverse(p)):Promise<void> {
        const op:ShareDB.ObjectReplaceOp = {p, oi, od};
        return await this.submitOp([op]);
    };
    public async submitObjectInsertOp(p:Array<string|number>, oi:any):Promise<void> {
        const op:ShareDB.ObjectInsertOp = {p, oi};
        return await this.submitOp([op]);
    };
    public async submitObjectDeleteOp(p:Array<string|number>, od:any=this.traverse(p)):Promise<void> {
        const op:ShareDB.ObjectDeleteOp = {p, od};
        return await this.submitOp([op]);
    };
    public async submitListReplaceOp(p:Array<string|number>, li:any, ld:any=this.traverse(p)):Promise<void> {
        const op:ShareDB.ListReplaceOp = {p, li, ld};
        return await this.submitOp([op]);
    };
    public async submitListInsertOp(p:Array<string|number>, li:any):Promise<void> {
        const op:ShareDB.ListInsertOp = {p, li};
        return await this.submitOp([op]);
    };
    public async submitListDeleteOp(p:Array<string|number>, ld:any=this.traverse(p)):Promise<void> {
        const op:ShareDB.ListDeleteOp = {p, ld};
        return await this.submitOp([op]);
    };
    public async submitListSpliceOp(p:Array<string|number>, index:number, numToRemove:number, ...toAdd:Array<any>):Promise<void> {
        const listDeleteOps:Array<ShareDB.ListDeleteOp> = [];
        const item:any = this.traverse(p);
        for(let i:number = index+numToRemove-1; i>=index; i--) {
            const pi:Array<string|number> = p.concat([i]);
            listDeleteOps.push({
                p: pi,
                ld: item[i]
            });
        }

        const listInsertOps:Array<ShareDB.ListInsertOp> = toAdd.map((li:any, i:number) => {
            return { p: p.concat([index+i]), li };
        });

        return await this.submitOp(listDeleteOps.concat(listInsertOps));
    };
    public async submitListPushOp(p:Array<string|number>, ...items:Array<any>):Promise<void> {
        const arr:Array<any> = this.traverse(p);
        const previousLength:number = arr.length;
        const ops:Array<ShareDB.ListInsertOp> = items.map((x:any, i:number) => {
            const op:ShareDB.ListInsertOp = {p:p.concat(previousLength+i), li:x};
            return op;
        });
        return await this.submitOp(ops);
    };
    public async submitListUnshiftOp(p:Array<string|number>, ...items:Array<any>):Promise<void> {
        const arr:Array<any> = this.traverse(p);
        const previousLength:number = arr.length;
        const ops:Array<ShareDB.ListInsertOp> = items.map((x:any, i:number) => {
            const op:ShareDB.ListInsertOp = {p:p.concat(i), li:x};
            return op;
        });
        return await this.submitOp(ops);
    };

    public fetch():Promise<ShareDB.Doc<E>> {
        return new Promise<ShareDB.Doc<E>>((resolve, reject) => {
            this.doc.fetch((err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(this.doc);
                }
            });
        });
    };
    public create(data:E, type?:ShareDB.OTType, options?:ShareDB.ShareDBCreateOptions):Promise<ShareDB.Doc<E>> {
        return new Promise<ShareDB.Doc<E>>((resolve, reject) => {
            this.doc.create(data, type, options, () => {
                resolve(this.doc);
            });
        });
    };
    public del(source:boolean=true):Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.doc.del({source}, (err) => {
                if(err) { reject(err); }
                else {
                    this.sdb.deleteDoc(this);
                    resolve();
                }
            });
        });
    };
    public subscribe(callback:(ops:Array<ShareDB.Op>, source:boolean, data:E)=>void):()=>void {
        this.doc.subscribe((err) => {
            if(err) { throw(err); }
            callback(null, null, this.doc.data);
        });
        const onOpFunc = (ops:Array<ShareDB.Op>, source:boolean) => {
            callback(ops, source, this.doc.data);
        };
        this.doc.on('op', onOpFunc);
        return ():void => {
            this.doc.removeListener('op', onOpFunc);
        };
    };
    public submitOp(ops:Array<ShareDB.Op>, source:boolean=true):Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.doc.submitOp(ops, {source}, (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };
    public async createIfEmpty(data:E, type?:ShareDB.OTType, options?:ShareDB.ShareDBCreateOptions):Promise<ShareDB.Doc<E>> {
        const doc:ShareDB.Doc<E> = await this.fetch();
        if(doc.type === null) {
            return this.create(data, type, options);
        } else {
            return doc;
        }
    };
    public destroy():void {
        this.doc.destroy();
        this.sdb.deleteDoc(this);
    };
};