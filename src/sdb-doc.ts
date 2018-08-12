import * as ShareDB from 'sharedb';
import {SDB} from './sdb';
import { isEqual } from 'lodash';
import { SDBSubDoc } from './sdb-subdoc';
import { OpSubmittable } from './OpSubmittable';

export type DocIdentifier = [string, string];

export class SDBDoc<E> extends OpSubmittable {
    constructor(private docIdentifier:DocIdentifier, private doc:ShareDB.Doc, private sdb:SDB) {
        super();
    };
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
        return isEqual(from, to.slice(0, fl)) ? to.slice(fl) : null;
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