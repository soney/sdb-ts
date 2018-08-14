import * as ShareDB from 'sharedb';
import { SDB } from './sdb';
import { SDBSubDoc } from './sdb-subdoc';
import { OpSubmittable } from './OpSubmittable';
import { isArrayEqual } from './utils';

export type DocIdentifier = [string, string];
export type Subscriber<E> = (eventType:string, ops:Array<ShareDB.Op>, source:any, data:E)=>void;

export class SDBDoc<E> extends OpSubmittable {
    constructor(private docIdentifier:DocIdentifier, private doc:ShareDB.Doc, private sdb:SDB) {
        super();
    };
    private subscribers:Subscriber<E>[] = [];
    public subDoc<T>(path: Array<string|number>): SDBSubDoc<T> {
        return new SDBSubDoc<T>(this, path);
    }
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

    public static relative(from: Array<string|number>, to: Array<string|number>): Array<string|number> {
        const fl = from.length;
        return isArrayEqual(from, to.slice(0, fl)) ? to.slice(fl) : null;
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
    private onOp = (ops:Array<ShareDB.Op>, source:any) => { this.subscribers.forEach((sub) => sub('op', ops, source, this.doc.data)); };
    private onCreate = () => { this.subscribers.forEach((sub) => sub('create', null, null, this.doc.data)); };

    public subscribe(subscriber: Subscriber<E> = ()=>null): Promise<void> {
        this.subscribers.push(subscriber);

        if(this.subscribers.length === 1) {
            this.doc.on('op', this.onOp);
            this.doc.on('create', this.onCreate);
            return new Promise<void>((resolve, reject) => {
                console.log('az');
                console.log(this.doc);
                this.doc.subscribe((err) => {
                    console.error(err);
                    console.log('b');
                    if(err) { reject(err); }
                    console.log('resolve');
                    resolve();
                    subscriber(null, null, null, this.doc.data);
                });
            });
        } else {
            subscriber(null, null, null, this.doc.data);
            return Promise.resolve();
        }
    };
    public unsubscribe(subscriber: Subscriber<E>): void {
        let idx: number;
        while((idx = this.subscribers.indexOf(subscriber))>=0) {
            this.subscribers.splice(idx, 1);
        }
        if(this.subscribers.length === 0) {
            this.doc.off('op', this.onOp);
            this.doc.off('create', this.onCreate);
        }
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