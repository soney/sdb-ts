import * as ShareDB from 'sharedb';
import { SDBDoc, Subscriber } from './SDBDoc';
import { OpSubmittable } from './OpSubmittable';
export declare class SDBSubDoc<E> extends OpSubmittable {
    private doc;
    private path;
    private subscriptionShims;
    constructor(doc: SDBDoc<any>, path: Array<string | number>);
    /**
     * Signal that we want to listen to changes in this sub-document. Note that we don't fetch new versions unless the document is being
     * subscribed to
     *
     * @param subscriber A callback function that accepts three parameters:
     * - `type`: `null` if we are fetching the initial version, `'create'` if the document was created, or `'op'` if an operation happened
     * - `ops`: The raw ShareDB operations (`null` if `type` is not `'op'`)
     * - `source`: The local source if passed in (`null` otherwise)
     * - `data`: The current document snapshot
     * @returns a promise that resolves when we have an initial snapshot of the sub-document
     */
    subscribe(callback?: Subscriber<E>): Promise<void>;
    /**
     * Unsubscribe from changes to this document
     * @param callback The callback to unsubscribe
     */
    unsubscribe(callback: Subscriber<E>): void;
    /**
     * Get the data in this sub-document
     */
    getData(): E;
    /**
     * Submit a raw series of ShareDB operations. Note that all paths should be relative to this subdoc
     * @param ops The raw operations
     * @param source (optional) the change source
     */
    submitOp(ops: Array<ShareDB.Op>, source?: any): Promise<this>;
    /**
     * Get the value at a given location in the document. Note that this is relative to this subdocument
     * @param path The path array
     */
    traverse(path: Array<string | number>): any;
}
