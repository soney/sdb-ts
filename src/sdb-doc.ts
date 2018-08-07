import * as ShareDB from 'sharedb';
import {SDB} from './sdb';

export type DocIdentifier = [string, string];
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

    public async submitObjectReplaceOp(p:Array<string|number>, oi:any, od:any=this.traverse(p)):Promise<this>   { return await this.submitOp([{p,oi,od}]); };
    public async submitObjectInsertOp (p:Array<string|number>, oi:any):Promise<this>                            { return await this.submitOp([{p,oi}]);    };
    public async submitObjectDeleteOp (p:Array<string|number>, od:any=this.traverse(p)):Promise<this>           { return await this.submitOp([{p,od}]);    };
    public async submitListReplaceOp  (p:Array<string|number>, li:any, ld:any=this.traverse(p)):Promise<this>   { return await this.submitOp([{p,li,ld}]); };
    public async submitListInsertOp   (p:Array<string|number>, li:any):Promise<this>                            { return await this.submitOp([{p,li}]);    };
    public async submitListDeleteOp   (p:Array<string|number>, ld:any=this.traverse(p)):Promise<this>           { return await this.submitOp([{p,ld}]);    };
    public async submitNumberAddOp    (p:Array<string|number>, na:number):Promise<this>                         { return await this.submitOp([{p, na}]);   };

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

    public fetch():Promise<ShareDB.Doc> {
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
    public del(source:any=true):Promise<void> {
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
    public subscribe(callback?:(eventType:string, ops:Array<ShareDB.Op>, source:any, data:E)=>void):()=>void {
        const onOpFunc = (ops:Array<ShareDB.Op>, source:any) => {
            if(callback) {
                callback('op', ops, source, this.doc.data);
            }
        };
        const onCreateFunc = () => {
            if(callback) {
                callback('create', null, null, this.doc.data);
            }
        };
        this.doc.subscribe((err) => {
            if(err) { throw(err); }
            if(callback) {
                callback(null, null, null, this.doc.data);
            }
        });
        this.doc.on('op', onOpFunc);
        this.doc.on('create', onCreateFunc);
        return ():void => {
            this.doc.removeListener('op', onOpFunc);
        };
    };
    public submitOp(ops:Array<ShareDB.Op>, source:any=true):Promise<this> {
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