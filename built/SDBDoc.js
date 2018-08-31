"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SDBSubDoc_1 = require("./SDBSubDoc");
const OpSubmittable_1 = require("./OpSubmittable");
const utils_1 = require("./utils");
/**
 * A class that represents a ShareDB document. This class uses generics: `const doc: SDBDooc<{x: number}> = client.get('docs', 'doc1')`
 */
class SDBDoc extends OpSubmittable_1.OpSubmittable {
    /**
     * Constructor. This hould never be called directly. Instead, use `SDBClient.get` or `SDBServer.get`
     * @param docIdentifier A two-item array identifying the document
     * @param doc The ShareDB doc being wrapped
     * @param sdb The parent SDB object
     */
    constructor(docIdentifier, doc, sdb) {
        super();
        this.docIdentifier = docIdentifier;
        this.doc = doc;
        this.sdb = sdb;
        this.subscribers = []; // A list of functions that are subscribing to ops and events
        // When an op happens forward to every subscriber
        this.onOp = (ops, source) => { this.subscribers.forEach((sub) => sub('op', ops, source, this.doc.data)); };
        // When a create event happens forward to every subscriber
        this.onCreate = () => { this.subscribers.forEach((sub) => sub('create', null, null, this.doc.data)); };
    }
    ;
    /**
     * Create a SubDoc of this document (a document to represent one particular item within it).
     * ```
     * // suppose doc has {a: 1, b: { x: { val: "abc" }}}
     * const sd = doc.subDoc<{val: string}>(['b', 'x]);
     * sd.subscribe(() => { console.log(sd.getData()); // {val: "abc"}});
     * ```
     * @param path The path of the subdoc
     */
    subDoc(path) {
        return new SDBSubDoc_1.SDBSubDoc(this, path);
    }
    /**
     * The identifier for this document
     * @returns a two-item array representing the identifier
     */
    getIdentifier() { return this.docIdentifier; }
    ;
    /**
     * Get the data in this document
     */
    getData() { return this.doc.data; }
    ;
    /**
     * Get the value at a given location in the document.
     * ```
     * // suppose doc has {a: 1, b: { x: { val: "abc" }}}
     * console.log(doc.traverse(['b', 'x', 'val'])); // prints 'abc'
     * ```
     * @param path The path array
     */
    traverse(path) {
        let x = this.getData();
        let prev = x;
        for (let i = 0; i < path.length; i++) {
            try {
                x = x[path[i]];
                prev = x;
            }
            catch (e) {
                throw new Error(`Could not traverse path ${path}. Object ${prev} does not have property ${path[i]}`);
            }
        }
        return x;
    }
    ;
    /**
     * Get the relative path from `from` to `to`.
     * @param from The path that we are reading relative to
     * @param to The full path
     * @return A path that takes us from `from` to `to`
     */
    static relative(from, to) {
        const fl = from.length;
        return utils_1.isArrayEqual(from, to.slice(0, fl)) ? to.slice(fl) : null;
    }
    ;
    /**
     * Fetch and get the actual ShareDB doc.
     * @returns a promise wrapping the ShareDB doc
     */
    fetch() {
        return new Promise((resolve, reject) => {
            this.doc.fetch((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this.doc);
                }
            });
        });
    }
    ;
    /**
     * Create this document
     * @param data The initial set of data
     * @param type (OT type) Defaults to 'ot-json0'.
     * @param options Passed on to ShareDB create
     */
    create(data, type, options) {
        return new Promise((resolve, reject) => {
            this.doc.create(data, type, options, () => {
                resolve(this);
            });
        });
    }
    ;
    /**
     * Delete the document locally and send changes to the ShareDB server
     * @param source (optional) passed locally
     */
    del(source = true) {
        return new Promise((resolve, reject) => {
            this.doc.del({ source }, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    this.sdb.deleteDoc(this);
                    resolve();
                }
            });
        });
    }
    ;
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
    subscribe(subscriber = () => null) {
        this.subscribers.push(subscriber);
        if (this.subscribers.length === 1) {
            this.doc.addListener('op', this.onOp);
            this.doc.addListener('create', this.onCreate);
            return new Promise((resolve, reject) => {
                this.doc.subscribe((err) => {
                    subscriber(null, null, null, this.doc.data);
                    if (err) {
                        reject(err);
                        throw (err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        }
        else {
            subscriber(null, null, null, this.doc.data);
            return Promise.resolve();
        }
    }
    ;
    /**
     * Stop listening in a subscription (the opposite of `.subscribe()`)
     * @param subscriber The subscribe function to remove
     */
    unsubscribe(subscriber) {
        let idx;
        while ((idx = this.subscribers.indexOf(subscriber)) >= 0) {
            this.subscribers.splice(idx, 1);
        }
        if (this.subscribers.length === 0) {
            this.doc.removeListener('op', this.onOp);
            this.doc.removeListener('create', this.onCreate);
        }
    }
    ;
    /**
     * Submit a raw series of ShareDB operations
     * @param ops The raw operations
     * @param source (optional) the change source
     */
    doSubmitOp(ops, source = true) {
        return new Promise((resolve, reject) => {
            this.doc.submitOp(ops, { source }, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this);
                }
            });
        });
    }
    ;
    /**
     * Create this document only if it's empty. If it's not empty, do nothing.
     * @param data The initial data
     * @param type The OT type
     * @param options Any other options passed into ShareDB
     */
    createIfEmpty(data, type, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.fetch();
            if (doc.type === null) {
                return this.create(data, type, options);
            }
            else {
                return this;
            }
        });
    }
    ;
    /**
     * When done with the document, do cleanup. This does *not* delete the doc.
     */
    destroy() {
        this.doc.destroy();
        this.sdb.deleteDoc(this);
    }
    ;
}
exports.SDBDoc = SDBDoc;
;
//# sourceMappingURL=SDBDoc.js.map