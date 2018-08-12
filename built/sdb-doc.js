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
const lodash_1 = require("lodash");
const sdb_subdoc_1 = require("./sdb-subdoc");
const OpSubmittable_1 = require("./OpSubmittable");
class SDBDoc extends OpSubmittable_1.OpSubmittable {
    constructor(docIdentifier, doc, sdb) {
        super();
        this.docIdentifier = docIdentifier;
        this.doc = doc;
        this.sdb = sdb;
    }
    ;
    subDoc(path) {
        return new sdb_subdoc_1.SDBSubDoc(this, path);
    }
    getIdentifier() { return this.docIdentifier; }
    ;
    getData() { return this.doc.data; }
    ;
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
    static relative(from, to) {
        const fl = from.length;
        return lodash_1.isEqual(from, to.slice(0, fl)) ? to.slice(fl) : null;
    }
    ;
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
    create(data, type, options) {
        return new Promise((resolve, reject) => {
            this.doc.create(data, type, options, () => {
                resolve(this);
            });
        });
    }
    ;
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
    subscribe(callback) {
        const onOpFunc = (ops, source) => {
            if (callback) {
                callback('op', ops, source, this.doc.data);
            }
        };
        const onCreateFunc = () => {
            if (callback) {
                callback('create', null, null, this.doc.data);
            }
        };
        this.doc.subscribe((err) => {
            if (err) {
                throw (err);
            }
            if (callback) {
                callback(null, null, null, this.doc.data);
            }
        });
        this.doc.on('op', onOpFunc);
        this.doc.on('create', onCreateFunc);
        return () => {
            this.doc.removeListener('op', onOpFunc);
        };
    }
    ;
    submitOp(ops, source = true) {
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
    destroy() {
        this.doc.destroy();
        this.sdb.deleteDoc(this);
    }
    ;
}
exports.SDBDoc = SDBDoc;
;
//# sourceMappingURL=sdb-doc.js.map