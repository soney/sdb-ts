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
class SDBDoc {
    constructor(docIdentifier, doc, sdb) {
        this.docIdentifier = docIdentifier;
        this.doc = doc;
        this.sdb = sdb;
    }
    ;
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
    submitObjectReplaceOp(p, oi, od = this.traverse(p)) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, oi, od }]); });
    }
    ;
    submitObjectInsertOp(p, oi) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, oi }]); });
    }
    ;
    submitObjectDeleteOp(p, od = this.traverse(p)) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, od }]); });
    }
    ;
    submitListReplaceOp(p, li, ld = this.traverse(p)) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, li, ld }]); });
    }
    ;
    submitListInsertOp(p, li) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, li }]); });
    }
    ;
    submitListDeleteOp(p, ld = this.traverse(p)) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, ld }]); });
    }
    ;
    submitNumberAddOp(p, na) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, na }]); });
    }
    ;
    submitListSpliceOp(p, index, numToRemove, ...toAdd) {
        return __awaiter(this, void 0, void 0, function* () {
            const listDeleteOps = [];
            const item = this.traverse(p);
            for (let i = index + numToRemove - 1; i >= index; i--) {
                const pi = p.concat([i]);
                listDeleteOps.push({
                    p: pi,
                    ld: item[i]
                });
            }
            const listInsertOps = toAdd.map((li, i) => {
                return { p: p.concat([index + i]), li };
            });
            return yield this.submitOp(listDeleteOps.concat(listInsertOps));
        });
    }
    ;
    submitListPushOp(p, ...items) {
        return __awaiter(this, void 0, void 0, function* () {
            const arr = this.traverse(p);
            const previousLength = arr.length;
            const ops = items.map((x, i) => {
                const op = { p: p.concat(previousLength + i), li: x };
                return op;
            });
            return yield this.submitOp(ops);
        });
    }
    ;
    submitListUnshiftOp(p, ...items) {
        return __awaiter(this, void 0, void 0, function* () {
            const arr = this.traverse(p);
            const previousLength = arr.length;
            const ops = items.map((x, i) => {
                const op = { p: p.concat(i), li: x };
                return op;
            });
            return yield this.submitOp(ops);
        });
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