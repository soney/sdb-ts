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
const sdb_doc_1 = require("./sdb-doc");
const lodash_1 = require("lodash");
const OpSubmittable_1 = require("./OpSubmittable");
class SDBSubDoc extends OpSubmittable_1.OpSubmittable {
    constructor(doc, path) {
        super();
        this.doc = doc;
        this.path = path;
    }
    ;
    subscribe(callback) {
        const unsubscribe = this.doc.subscribe((eventType, ops, source, data) => {
            if (eventType === 'op') {
                const relOps = [];
                ops.forEach((op) => {
                    const rp = sdb_doc_1.SDBDoc.relative(this.path, op.p);
                    if (rp) {
                        relOps.push({ op, rp });
                    }
                });
                if (relOps.length > 0) {
                    const newOps = relOps.map(({ op, rp }) => lodash_1.extend({}, op, { p: rp }));
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
        });
        return unsubscribe;
    }
    ;
    getData() {
        try {
            return this.doc.traverse(this.path);
        }
        catch (e) {
            return null;
        }
    }
    submitOp(ops, source = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const absOps = ops.map((op) => lodash_1.extend({}, op, { p: this.path.concat(op.p) }));
            yield this.doc.submitOp(absOps, source);
            return this;
        });
    }
    ;
    traverse(path) {
        return this.doc.traverse(this.path.concat(path));
    }
    ;
}
exports.SDBSubDoc = SDBSubDoc;
//# sourceMappingURL=sdb-subdoc.js.map