"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isArrayEqual(a, b) {
    if (a.length === b.length) {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
}
exports.isArrayEqual = isArrayEqual;
function extend(obj, ...args) {
    args.forEach((arg) => {
        if (arg) {
            for (let prop in arg) {
                obj[prop] = arg[prop];
            }
        }
    });
    return obj;
}
exports.extend = extend;
//# sourceMappingURL=utils.js.map