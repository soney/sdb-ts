import * as ShareDBClient from 'sharedb/lib/client';
import * as ShareDB from 'sharedb';

type DocIdentifier = [string,string];

abstract class SDB {
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

    public abstract close():Promise<void>;

    public deleteDoc(doc:SDBDoc<any>):void {
        this.docs.delete(doc.getIdentifier());
    };
}

export class SDBClient extends SDB {
    constructor(readonly ws:WebSocket) {
        super();
        this.connection = new ShareDBClient.Connection(ws);
    };
    public close():Promise<void> {
        return Promise.resolve();
    };
};
export class SDBServer extends SDB {
    private readonly share:ShareDB;
    constructor(options?:{db?:ShareDB.DB, pubsub?:ShareDB.PubSub}) {
        super();
        this.share = new ShareDB(options);
        this.connection = this.share.connect();
    };

    public use(action:ShareDB.Action, fn:ShareDB.UseCallback):void {
        this.share.use(action, fn);
    };

    public close():Promise<void> {
        return new Promise((resolve, reject) => {
            this.share.close(()=> {
                resolve();
            });
        });
    };
    public listen(stream:any):void {
        this.share.listen(stream);
    };
};

export class SDBDoc<E> {
    constructor(private docIdentifier:DocIdentifier, private doc:ShareDB.Doc, private sdb:SDB) { };
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
    public async submitObjectReplaceOp(p:Array<string|number>, oi:any, od:any=this.traverse(p)):Promise<this> {
        return await this.submitOp([{p,oi,od}]);
    };
    public async submitObjectInsertOp(p:Array<string|number>, oi:any):Promise<this> {
        return await this.submitOp([{p,oi}]);
    };
    public async submitObjectDeleteOp(p:Array<string|number>, od:any=this.traverse(p)):Promise<this> {
        return await this.submitOp([{p,od}]);
    };
    public async submitListReplaceOp(p:Array<string|number>, li:any, ld:any=this.traverse(p)):Promise<this> {
        return await this.submitOp([{p,li,ld}]);
    };
    public async submitListInsertOp(p:Array<string|number>, li:any):Promise<this> {
        return await this.submitOp([{p,li}]);
    };
    public async submitListDeleteOp(p:Array<string|number>, ld:any=this.traverse(p)):Promise<this> {
        return await this.submitOp([{p,ld}]);
    };
    public async submitListSpliceOp(p:Array<string|number>, index:number, numToRemove:number, ...toAdd:Array<any>):Promise<this> {
        const listDeleteOps:Array<ShareDB.Op> = [];
        const item:any = this.traverse(p);
        for(let i:number = index+numToRemove-1; i>=index; i--) {
            const pi:Array<string|number> = p.concat([i]);
            listDeleteOps.push({
                p: pi,
                ld: item[i]
            });
        }

        const listInsertOps:Array<ShareDB.Op> = toAdd.map((li:any, i:number) => {
            return { p: p.concat([index+i]), li };
        });

        return await this.submitOp(listDeleteOps.concat(listInsertOps));
    };
    public async submitListPushOp(p:Array<string|number>, ...items:Array<any>):Promise<this> {
        const arr:Array<any> = this.traverse(p);
        const previousLength:number = arr.length;
        const ops:Array<ShareDB.Op> = items.map((x:any, i:number) => {
            const op:ShareDB.Op = {p:p.concat(previousLength+i), li:x};
            return op;
        });
        return await this.submitOp(ops);
    };
    public async submitListUnshiftOp(p:Array<string|number>, ...items:Array<any>):Promise<this> {
        const arr:Array<any> = this.traverse(p);
        const previousLength:number = arr.length;
        const ops:Array<ShareDB.Op> = items.map((x:any, i:number) => {
            const op:ShareDB.Op = {p:p.concat(i), li:x};
            return op;
        });
        return await this.submitOp(ops);
    };

    private fetch():Promise<ShareDB.Doc> {
        return new Promise<ShareDB.Doc>((resolve, reject) => {
            this.doc.fetch((err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(this.doc);
                }
            });
        });
    };
    public create(data:E, type?, options?):Promise<this> {
        return new Promise<this>((resolve, reject) => {
            this.doc.create(data, type, options, () => {
                resolve(this);
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
    public submitOp(ops:Array<ShareDB.Op>, source:boolean=true):Promise<this> {
        return new Promise<this>((resolve, reject) => {
            this.doc.submitOp(ops, {source}, (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    };
    public async createIfEmpty(data:E, type?, options?):Promise<this> {
        const doc:ShareDB.Doc = await this.fetch();
        if(doc.type === null) {
            return this.create(data, type, options);
        } else {
            return this;
        }
    };
    public destroy():void {
        this.doc.destroy();
        this.sdb.deleteDoc(this);
    };
};