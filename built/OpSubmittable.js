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
class OpSubmittable {
    constructor() { }
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
}
exports.OpSubmittable = OpSubmittable;
;
//# sourceMappingURL=OpSubmittable.js.map