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
exports.ImmutabilityWrapper = void 0;
const immutability_helper_1 = require("immutability-helper");
var OP;
(function (OP) {
    OP[OP["NUMADD"] = 0] = "NUMADD";
    OP[OP["SUBTYPE"] = 1] = "SUBTYPE";
    OP[OP["LISTINSERT"] = 2] = "LISTINSERT";
    OP[OP["LISTDELETE"] = 3] = "LISTDELETE";
    OP[OP["LISTREPLACE"] = 4] = "LISTREPLACE";
    OP[OP["LISTMOVE"] = 5] = "LISTMOVE";
    OP[OP["OBJINSERT"] = 6] = "OBJINSERT";
    OP[OP["OBJDELETE"] = 7] = "OBJDELETE";
    OP[OP["OBJREPLACE"] = 8] = "OBJREPLACE";
    OP[OP["STRINGINSERT"] = 9] = "STRINGINSERT";
    OP[OP["STRINGDELETE"] = 10] = "STRINGDELETE";
})(OP || (OP = {}));
class ImmutabilityWrapper {
    constructor(doc) {
        this.doc = doc;
        this.data = null;
        this.isSubscribed = false;
        this.data = ImmutabilityWrapper.deepClone(this.doc.getData());
        this.subscribeToDoc();
    }
    getData() {
        return this.data;
    }
    resubscribe() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isSubscribed) {
                yield this.doc.subscribe(this.subscriptionFn);
                this.isSubscribed = true;
            }
        });
    }
    unsubscribe() {
        if (this.isSubscribed) {
            this.doc.unsubscribe(this.subscriptionFn);
            this.isSubscribed = false;
        }
    }
    subscribeToDoc() {
        return __awaiter(this, void 0, void 0, function* () {
            this.subscriptionFn = (eventType, ops) => {
                if (eventType === null) {
                    this.data = ImmutabilityWrapper.deepClone(this.doc.getData());
                }
                else if (eventType === 'create') {
                    this.data = ImmutabilityWrapper.deepClone(this.doc.getData());
                }
                else if (eventType === 'op') {
                    // strange stuff happens when the path length is 0
                    if (ops.some((op) => op.p.length === 0)) {
                        this.data = ImmutabilityWrapper.deepClone(this.doc.getData());
                    }
                    else {
                        ops.forEach((op) => {
                            this.data = ImmutabilityWrapper.getUpdatedData(this.data, op);
                        });
                    }
                }
            };
            yield this.doc.subscribe(this.subscriptionFn);
            this.isSubscribed = true;
        });
    }
    static getUpdatedData(previousData, op) {
        const opType = ImmutabilityWrapper.getOpType(op);
        if (opType === OP.SUBTYPE) {
            return this.deepClone(previousData);
        }
        const { p } = op;
        const plen = p.length;
        const updateObject = {};
        let currData = previousData;
        let currUpdateObject = updateObject;
        const buildUpTo = ([OP.OBJDELETE, OP.LISTINSERT, OP.LISTDELETE, OP.LISTREPLACE, OP.LISTMOVE, OP.STRINGINSERT, OP.STRINGDELETE].includes(opType)) ? plen - 1 : plen;
        for (let i = 0; i < buildUpTo; i++) {
            const pi = p[i];
            if (i === buildUpTo - 1) {
                if (opType === OP.NUMADD) {
                    const { na } = op;
                    currUpdateObject[pi] = { $set: currData[pi] + na };
                }
                else if (opType === OP.OBJINSERT || opType === OP.OBJREPLACE) {
                    const { oi } = op;
                    currUpdateObject[pi] = { $set: ImmutabilityWrapper.deepClone(oi) };
                }
                else if (opType === OP.OBJDELETE) {
                    const piPlusOne = p[i + 1];
                    currUpdateObject[pi] = { $unset: [piPlusOne] };
                }
                else if (opType === OP.LISTINSERT) {
                    const { li } = op;
                    const piPlusOne = p[i + 1];
                    currUpdateObject[pi] = { $splice: [[piPlusOne, 0, ImmutabilityWrapper.deepClone(li)]] };
                }
                else if (opType === OP.LISTDELETE) {
                    const piPlusOne = p[i + 1];
                    currUpdateObject[pi] = { $splice: [[piPlusOne, 1]] };
                }
                else if (opType === OP.LISTREPLACE) {
                    const { li } = op;
                    const piPlusOne = p[i + 1];
                    currUpdateObject[pi] = { $splice: [[piPlusOne, 1, ImmutabilityWrapper.deepClone(li)]] };
                }
                else if (opType === OP.LISTMOVE) {
                    const { lm } = op;
                    const piPlusOne = p[i + 1];
                    const toInsert = ImmutabilityWrapper.deepClone(currData[pi][piPlusOne]);
                    currUpdateObject[pi] = { $splice: [[piPlusOne, 1], [lm, 0, toInsert]] };
                }
                else if (opType === OP.STRINGINSERT) {
                    const { si } = op;
                    const piPlusOne = p[i + 1];
                    const existingStr = currData[pi];
                    const newStr = existingStr.substring(0, piPlusOne) + si + existingStr.substring(piPlusOne, existingStr.length);
                    currUpdateObject[pi] = { $set: newStr };
                }
                else if (opType === OP.STRINGDELETE) {
                    const { sd } = op;
                    const piPlusOne = p[i + 1];
                    const existingStr = currData[pi];
                    const newStr = existingStr.substring(0, piPlusOne) + existingStr.substring(piPlusOne + sd.length, existingStr.length);
                    currUpdateObject[pi] = { $set: newStr };
                }
            }
            else {
                currUpdateObject[pi] = {};
            }
            currUpdateObject = currUpdateObject[pi];
            currData = currData[pi];
        }
        return immutability_helper_1.default(previousData, updateObject);
    }
    static getOpType(op) {
        const ophas = (...propNames) => (propNames.every((prop) => op.hasOwnProperty(prop)));
        if (ophas('na')) {
            return OP.NUMADD;
        }
        else if (ophas('t', 'o')) {
            return OP.SUBTYPE;
        }
        else if (ophas('li', 'ld')) {
            return OP.LISTREPLACE;
        }
        else if (ophas('li')) {
            return OP.LISTINSERT;
        }
        else if (ophas('ld')) {
            return OP.LISTDELETE;
        }
        else if (ophas('lm')) {
            return OP.LISTMOVE;
        }
        else if (ophas('oi', 'od')) {
            return OP.OBJREPLACE;
        }
        else if (ophas('oi')) {
            return OP.OBJINSERT;
        }
        else if (ophas('od')) {
            return OP.OBJDELETE;
        }
        else if (ophas('si')) {
            return OP.STRINGINSERT;
        }
        else if (ophas('sd')) {
            return OP.STRINGDELETE;
        }
        else {
            throw new Error('Could not determine type for op');
        }
    }
    static deepClone(obj) {
        if (obj === undefined || obj === null) {
            return obj;
        }
        else {
            return JSON.parse(JSON.stringify(obj));
        }
    }
}
exports.ImmutabilityWrapper = ImmutabilityWrapper;
//# sourceMappingURL=SDBDocImmutabilityWrapper.js.map