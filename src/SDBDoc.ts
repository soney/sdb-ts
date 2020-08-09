import * as ShareDB from 'sharedb';
import { SDB } from './SDB';
import { SDBSubDoc } from './SDBSubDoc';
import { OpSubmittable } from './OpSubmittable';
import { isArrayEqual } from './utils';

export type DocIdentifier = [string, string];
export type Subscriber<E> = (eventType: string | null, ops: ReadonlyArray<ShareDB.Op> | null, source: any, data: E | null)=>void;

/**
 * A class that represents a ShareDB document. This class uses generics: `const doc: SDBDooc<{x: number}> = client.get('docs', 'doc1')`
 */
export class SDBDoc<E> extends OpSubmittable {
    private initialDocFetchPromise: Promise<E>|null = null;
    /**
     * Constructor. This hould never be called directly. Instead, use `SDBClient.get` or `SDBServer.get`
     * @param docIdentifier A two-item array identifying the document
     * @param doc The ShareDB doc being wrapped
     * @param sdb The parent SDB object
     */
    constructor(private docIdentifier:DocIdentifier, private doc:ShareDB.Doc, private sdb:SDB) {
        super();
    };

    private subscribers:Subscriber<E>[] = []; // A list of functions that are subscribing to ops and events

    /**
     * Returns the raw ShareDB doc
     */
    public __doc__(): ShareDB.Doc {
        return this.doc;
    }

    /**
     * Create a SubDoc of this document (a document to represent one particular item within it).
     * ```
     * // suppose doc has {a: 1, b: { x: { val: "abc" }}}
     * const sd = doc.subDoc<{val: string}>(['b', 'x]);
     * sd.subscribe(() => { console.log(sd.getData()); // {val: "abc"}});
     * ```
     * @param path The path of the subdoc
     */
    public subDoc<T>(path: ShareDB.Path): SDBSubDoc<T> {
        return new SDBSubDoc<T>(this, path);
    }

    /**
     * The identifier for this document
     * @returns a two-item array representing the identifier
     */
    public getIdentifier():DocIdentifier { return this.docIdentifier; };

    /**
     * Get the data in this document
     */
    public getData():E { return this.doc.data; };

    /**
     * Get the value at a given location in the document.
     * ```
     * // suppose doc has {a: 1, b: { x: { val: "abc" }}}
     * console.log(doc.traverse(['b', 'x', 'val'])); // prints 'abc'
     * ```
     * @param path The path array
     */
    public traverse(path:ReadonlyArray<string|number>):any {
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

    /**
     * Get the relative path from `from` to `to`.
     * @param from The path that we are reading relative to
     * @param to The full path
     * @return A path that takes us from `from` to `to`
     */
    public static relative(from: ShareDB.Path, to: ShareDB.Path): ShareDB.Path {
        const fl = from.length;
        return isArrayEqual(from, to.slice(0, fl)) ? to.slice(fl) : null;
    };


    /**
     * Fetch and get the actual ShareDB doc.
     * @returns a promise wrapping the ShareDB doc
     */
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
    /**
     * Create this document
     * @param data The initial set of data
     * @param type (OT type) Defaults to 'ot-json0'.
     * @param options Passed on to ShareDB create
     */
    public create(data:E, type?, options?):Promise<this> {
        return new Promise<this>((resolve, reject) => {
            this.doc.create(data, type, options, () => {
                resolve(this);
            });
        });
    };
    /**
     * Delete the document locally and send changes to the ShareDB server
     * @param source (optional) passed locally
     */
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

    // When an op happens forward to every subscriber
    private onOp = (ops: ReadonlyArray<ShareDB.Op>, source:any) => { this.subscribers.forEach((sub) => sub('op', ops, source, this.doc.data)); };

    // When a create event happens forward to every subscriber
    private onCreate = () => { this.subscribers.forEach((sub) => sub('create', null, null, this.doc.data)); };

    /**
     * Signal that we want to listen to changes in this document. Note that we don't fetch new versions unless the document is being
     * subscribed to
     * 
     * @param subscriber A callback function that accepts three parameters:
     * - `type`: `null` if we are fetching the initial version, `'create'` if the document was created, or `'op'` if an operation happened
     * - `ops`: The raw ShareDB operations (`null` if `type` is not `'op'`)
     * - `source`: The local source if passed in (`null` otherwise)
     * - `data`: The current document snapshot
     * @returns a promise that resolves when we have an initial snapshot of the document
     */
    public subscribe(subscriber: Subscriber<E> = ()=>null): Promise<void> {
        this.subscribers.push(subscriber);

        if(this.subscribers.length === 1) {
            this.doc.addListener('op', this.onOp);
            this.doc.addListener('create', this.onCreate);
            this.initialDocFetchPromise = new Promise<E>((resolve, reject) => {
                this.doc.subscribe((err) => {
                    // if(this.subscribers.includes(subscriber)) { // in case the subscriber was removed before the first fetch
                    //     subscriber(null, null, null, this.doc.data);
                    // }
                    if(err) {
                        reject(err);
                        throw(err);
                    } else {
                        resolve(this.doc.data);
                    }
                });
            });
        }
        return this.initialDocFetchPromise.then(() => {
            if(this.subscribers.includes(subscriber)) { // in case the subscriber was removed before the first fetch
                subscriber(null, null, null, this.doc.data);
            }
        });
    };
    /**
     * Stop listening in a subscription (the opposite of `.subscribe()`)
     * @param subscriber The subscribe function to remove
     */
    public unsubscribe(subscriber: Subscriber<E>): void {
        let idx: number;
        while((idx = this.subscribers.indexOf(subscriber))>=0) {
            this.subscribers.splice(idx, 1);
        }
        if(this.subscribers.length === 0) {
            this.doc.removeListener('op', this.onOp);
            this.doc.removeListener('create', this.onCreate);
        }
    };

    /**
     * Submit a raw series of ShareDB operations
     * @param ops The raw operations
     * @param source (optional) the change source
     */
    protected doSubmitOp(ops:ReadonlyArray<ShareDB.Op>, source:any=true):Promise<this> {
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
    /**
     * Create this document only if it's empty. If it's not empty, do nothing.
     * @param data The initial data
     * @param type The OT type
     * @param options Any other options passed into ShareDB
     */
    public async createIfEmpty(data:E, type?, options?):Promise<this> {
        const doc:ShareDB.Doc = await this.fetch();
        if(doc.type === null) {
            return this.create(data, type, options);
        } else {
            return this;
        }
    };
    /**
     * When done with the document, do cleanup. This does *not* delete the doc.
     */
    public destroy():void {
        this.doc.destroy();
        this.sdb.deleteDoc(this);
    };

    public static matches(p: ShareDB.Path, regexes: ReadonlyArray<RegExp|number|NumberConstructor|StringConstructor|string|boolean|number|((x: string|number, i: number, p: ShareDB.Path)=>boolean)>): (RegExpMatchArray|string|boolean|number)[] | null {
        if(p.length !== regexes.length) {
            return null;
        } else {
            const matches: (RegExpMatchArray|string|boolean|number)[] = [];
            for(let i: number = 0, len = p.length; i<len; i++) {
                const regexi = regexes[i];
                const pi = p[i];
                if(regexi instanceof RegExp) {
                    const match = `${pi}`.match(regexi);
                    if(match === null) {
                        return null;
                    } else {
                        matches.push(match);
                    }
                } else if(typeof regexi === 'boolean') {
                    if(regexi === false) {
                        return null;
                    } else {
                        matches.push(pi);
                    }
                } else if(regexi === Number) {
                    if(typeof pi === 'number') {
                        matches.push(pi);
                    } else {
                        return null;
                    }
                } else if(regexi === String) {
                    if(typeof pi === 'string') {
                        matches.push(pi);
                    } else {
                        return null;
                    }
                } else if(typeof regexi === 'function') {
                    const result = regexi(pi, i, p);
                    if(result === false) {
                        return null;
                    } else {
                        matches.push(result);
                    }
                } else {
                    if(pi === regexi) {
                        matches.push(pi);
                    } else {
                        return null;
                    }
                }
            }
            return matches;
        }
    }
};