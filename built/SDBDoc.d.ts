import * as ShareDB from 'sharedb';
import { SDB } from './SDB';
import { SDBSubDoc } from './SDBSubDoc';
import { OpSubmittable } from './OpSubmittable';
export declare type DocIdentifier = [string, string];
export declare type Subscriber<E> = (eventType: string | null, ops: ReadonlyArray<ShareDB.Op> | null, source: any, data: E | null) => void;
/**
 * A class that represents a ShareDB document. This class uses generics: `const doc: SDBDooc<{x: number}> = client.get('docs', 'doc1')`
 */
export declare class SDBDoc<E> extends OpSubmittable {
    private docIdentifier;
    private doc;
    private sdb;
    private initialDocFetchPromise;
    /**
     * Constructor. This hould never be called directly. Instead, use `SDBClient.get` or `SDBServer.get`
     * @param docIdentifier A two-item array identifying the document
     * @param doc The ShareDB doc being wrapped
     * @param sdb The parent SDB object
     */
    constructor(docIdentifier: DocIdentifier, doc: ShareDB.Doc, sdb: SDB);
    private subscribers;
    /**
     * Returns the raw ShareDB doc
     */
    __doc__(): ShareDB.Doc;
    /**
     * Create a SubDoc of this document (a document to represent one particular item within it).
     * ```
     * // suppose doc has {a: 1, b: { x: { val: "abc" }}}
     * const sd = doc.subDoc<{val: string}>(['b', 'x]);
     * sd.subscribe(() => { console.log(sd.getData()); // {val: "abc"}});
     * ```
     * @param path The path of the subdoc
     */
    subDoc<T>(path: ShareDB.Path): SDBSubDoc<T>;
    /**
     * The identifier for this document
     * @returns a two-item array representing the identifier
     */
    getIdentifier(): DocIdentifier;
    /**
     * Get the data in this document
     */
    getData(): E;
    /**
     * Get the value at a given location in the document.
     * ```
     * // suppose doc has {a: 1, b: { x: { val: "abc" }}}
     * console.log(doc.traverse(['b', 'x', 'val'])); // prints 'abc'
     * ```
     * @param path The path array
     */
    traverse(path: ReadonlyArray<string | number>): any;
    /**
     * Get the relative path from `from` to `to`.
     * @param from The path that we are reading relative to
     * @param to The full path
     * @return A path that takes us from `from` to `to`
     */
    static relative(from: ShareDB.Path, to: ShareDB.Path): ShareDB.Path;
    /**
     * Fetch and get the actual ShareDB doc.
     * @returns a promise wrapping the ShareDB doc
     */
    fetch(): Promise<ShareDB.Doc>;
    /**
     * Create this document
     * @param data The initial set of data
     * @param type (OT type) Defaults to 'ot-json0'.
     * @param options Passed on to ShareDB create
     */
    create(data: E, type?: any, options?: any): Promise<this>;
    /**
     * Delete the document locally and send changes to the ShareDB server
     * @param source (optional) passed locally
     */
    del(source?: any): Promise<void>;
    private onOp;
    private onCreate;
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
    subscribe(subscriber?: Subscriber<E>): Promise<void>;
    /**
     * Stop listening in a subscription (the opposite of `.subscribe()`)
     * @param subscriber The subscribe function to remove
     */
    unsubscribe(subscriber: Subscriber<E>): void;
    /**
     * Submit a raw series of ShareDB operations
     * @param ops The raw operations
     * @param source (optional) the change source
     */
    protected doSubmitOp(ops: ReadonlyArray<ShareDB.Op>, source?: any): Promise<this>;
    /**
     * Create this document only if it's empty. If it's not empty, do nothing.
     * @param data The initial data
     * @param type The OT type
     * @param options Any other options passed into ShareDB
     */
    createIfEmpty(data: E, type?: any, options?: any): Promise<this>;
    /**
     * When done with the document, do cleanup. This does *not* delete the doc.
     */
    destroy(): void;
    static matches(p: ShareDB.Path, regexes: ReadonlyArray<RegExp | number | NumberConstructor | StringConstructor | string | boolean | number | ((x: string | number, i: number, p: ShareDB.Path) => boolean)>): (RegExpMatchArray | string | boolean | number)[] | null;
}
