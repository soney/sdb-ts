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
        this.subscribers = [];
        this.onOp = (ops, source) => { this.subscribers.forEach((sub) => sub('op', ops, source, this.doc.data)); };
        this.onCreate = () => { this.subscribers.forEach((sub) => sub('create', null, null, this.doc.data)); };
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
    removeSubscriber(subscriber) {
        let idx;
        while ((idx = this.subscribers.indexOf(subscriber)) >= 0) {
            this.subscribers.splice(idx, 1);
        }
        if (this.subscribers.length === 0) {
            this.doc.off('op', this.onOp);
            this.doc.off('create', this.onCreate);
        }
    }
    subscribe(subscriber = () => null) {
        this.subscribers.push(subscriber);
        if (this.subscribers.length === 1) {
            this.doc.on('op', this.onOp);
            this.doc.on('create', this.onCreate);
            this.doc.subscribe((err) => {
                if (err) {
                    throw (err);
                }
                subscriber(null, null, null, this.doc.data);
            });
        }
        else {
            subscriber(null, null, null, this.doc.data);
        }
        return () => { this.removeSubscriber(subscriber); };
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