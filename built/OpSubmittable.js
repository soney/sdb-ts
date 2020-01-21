"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class OpSubmittable {
    constructor() { }
    ;
    /**
     * Replace within an object (if the property already has a value).
     * ```
     * doc.submitObjectReplaceOp(['prop1', 'x'], 'value');
     * ```
     * is analogous to
     *
     * ```
     * obj.prop1.x = 'value';
     * ```
     * @param p The path array
     * @param oi The object to insert
     * @param od (optional) The object to remove. Leave this unspecified
     * @returns A promise that resolve to `this`
     */
    submitObjectReplaceOp(p, oi, od = this.traverse(p)) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, oi, od }]); });
    }
    ;
    /**
     * Insert within an object (if the property does not have a value).
     * ```
     * doc.submitObjectInsertOp(['prop1', 'x'], 'value');
     * ```
     * is analogous to
     *
     * ```
     * obj.prop1.x = 'value';
     * ```
     * @param p The path array
     * @param oi The object to insert
     * @returns A promise that resolve to `this`
     */
    submitObjectInsertOp(p, oi) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, oi }]); });
    }
    ;
    /**
     * Delete an object property.
     * ```
     * doc.submitObjectDeleteOp(['prop1', 'x']);
     * ```
     * is analogous to
     *
     * ```
     * delete obj.prop1.x;
     * ```
     * @param p The path array
     * @param od (optional) The object to delete. Leave this unspecified.
     * @returns A promise that resolve to `this`
     */
    submitObjectDeleteOp(p, od = this.traverse(p)) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, od }]); });
    }
    ;
    /**
     * Replace an item in a list
     * ```
     * doc.submitListReplaceOp(['lst', 0], 'item');
     * ```
     * is analogous to
     *
     * ```
     * obj.lst[0] = 'item';
     * ```
     * @param p The path array
     * @param li The object to insert.
     * @param ld The object to remove. Leave this unspecified.
     * @returns A promise that resolve to `this`
     */
    submitListReplaceOp(p, li, ld = this.traverse(p)) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, li, ld }]); });
    }
    ;
    /**
     * Insert an item into a list
     * ```
     * doc.submitListInsert(['lst', 0], 'item');
     * ```
     * is analogous to
     *
     * ```
     * obj.lst[0] = 'item';
     * ```
     * @param p The path array
     * @param li The object to insert.
     * @returns A promise that resolve to `this`
     */
    submitListInsertOp(p, li) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, li }]); });
    }
    ;
    /**
     * Remove an item from a list
     * ```
     * doc.submitListDeleteOp(['lst', 2]);
     * ```
     * is analogous to
     *
     * ```
     * obj.lst.splice(2, 1);
     * ```
     * @param p The path array
     * @param ld The object to delete. Leave this unspecified.
     * @returns A promise that resolve to `this`
     */
    submitListDeleteOp(p, ld = this.traverse(p)) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, ld }]); });
    }
    ;
    /**
     * Move an item in a list
     * @param p The path array
     * @param lm The new index for the item specified in `p`
     * @returns A promise that resolve to `this`
     */
    submitListMoveOp(p, lm) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, lm }]); });
    }
    ;
    /**
     * Increment a number
     * ```
     * doc.submitNumberAddOp(['prop1', 'x'], 4);
     * ```
     * is analogous to
     *
     * ```
     * obj.prop1.x += 4;
     * ```
     * @param p The path array
     * @param na The number to increment by
     * @returns A promise that resolve to `this`
     */
    submitNumberAddOp(p, na) {
        return __awaiter(this, void 0, void 0, function* () { return yield this.submitOp([{ p, na }]); });
    }
    ;
    /**
     * Perform a JavaScript splice operation
     *
     * @param p The path array
     * @param index Index at which to start changing the array (with origin 0).
     * @param numToRemove An integer indicating the number of old array elements to remove.
     * @param toAdd The elements to add to the array, beginning at `index`.
     */
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
            const listInsertOps = toAdd.map((li, i) => ({ p: p.concat([index + i]), li }));
            const ops = Array.prototype.concat(listDeleteOps, listInsertOps);
            return yield this.submitOp(ops);
        });
    }
    ;
    /**
     * Push any number of items to the end of the list.
     *
     * @param p The path array
     * @param items The items to add to the end of the list
     */
    submitListPushOp(p, ...items) {
        return __awaiter(this, void 0, void 0, function* () {
            const arr = this.traverse(p);
            const previousLength = arr.length;
            const ops = items.map((x, i) => ({ p: p.concat(previousLength + i), li: x }));
            return yield this.submitOp(ops);
        });
    }
    ;
    /**
     * Add any number of items to the beginning of a list
     *
     * @param p The path array
     * @param items The items to add to the beginning of the list
     */
    submitListUnshiftOp(p, ...items) {
        return __awaiter(this, void 0, void 0, function* () {
            const ops = items.map((x, i) => ({ p: p.concat(i), li: x }));
            return yield this.submitOp(ops);
        });
    }
    ;
    /**
     * Submit a series of ShareDB operations
     * @param ops The raw operations
     * @param source (optional) the change source
     */
    submitOp(ops, source) {
        return this.doSubmitOp(ops, source);
    }
    ;
}
exports.OpSubmittable = OpSubmittable;
;
//# sourceMappingURL=OpSubmittable.js.map