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
const SDBDoc_1 = require("./SDBDoc");
const OpSubmittable_1 = require("./OpSubmittable");
const utils_1 = require("./utils");
class SDBSubDoc extends OpSubmittable_1.OpSubmittable {
    constructor(doc, path) {
        super();
        this.doc = doc;
        this.path = path;
        this.subscriptionShims = new Map();
    }
    ;
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
    subscribe(callback = () => null) {
        const shimmedCB = (eventType, ops, source, data) => {
            if (eventType === 'op') {
                const relOps = [];
                ops.forEach((op) => {
                    const rp = SDBDoc_1.SDBDoc.relative(this.path, op.p);
                    if (rp) {
                        relOps.push({ op, rp });
                    }
                });
                if (relOps.length > 0) {
                    const newOps = relOps.map(({ op, rp }) => utils_1.extend({}, op, { p: rp }));
                    if (callback) {
                        callback(eventType, newOps, source, this.getData());
                    }
                }
            }
            else {
                if (callback) {
                    callback(eventType, ops, source, this.getData());
                }
            }
        };
        if (this.subscriptionShims.has(callback)) {
            this.subscriptionShims.set(callback, this.subscriptionShims.get(callback).concat([shimmedCB]));
        }
        else {
            this.subscriptionShims.set(callback, [shimmedCB]);
        }
        return this.doc.subscribe(shimmedCB);
    }
    /**
     * Unsubscribe from changes to this document
     * @param callback The callback to unsubscribe
     */
    unsubscribe(callback) {
        if (this.subscriptionShims.has(callback)) {
            const shimmedCB = this.subscriptionShims.get(callback);
            shimmedCB.forEach((cb) => this.doc.unsubscribe(cb));
            this.subscriptionShims.delete(callback);
        }
    }
    /**
     * Get the data in this sub-document
     */
    getData() {
        try {
            return this.doc.traverse(this.path);
        }
        catch (e) {
            return null;
        }
    }
    /**
     * Submit a raw series of ShareDB operations. Note that all paths should be relative to this subdoc
     * @param ops The raw operations
     * @param source (optional) the change source
     */
    submitOp(ops, source = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const absOps = ops.map((op) => utils_1.extend({}, op, { p: this.path.concat(op.p) }));
            yield this.doc.submitOp(absOps, source);
            return this;
        });
    }
    ;
    /**
     * Get the value at a given location in the document. Note that this is relative to this subdocument
     * @param path The path array
     */
    traverse(path) {
        return this.doc.traverse(this.path.concat(path));
    }
    ;
}
exports.SDBSubDoc = SDBSubDoc;
//# sourceMappingURL=SDBSubDoc.js.map