import * as ShareDB from 'sharedb';
export declare abstract class OpSubmittable {
    constructor();
    submitObjectReplaceOp(p: Array<string | number>, oi: any, od?: any): Promise<this>;
    submitObjectInsertOp(p: Array<string | number>, oi: any): Promise<this>;
    submitObjectDeleteOp(p: Array<string | number>, od?: any): Promise<this>;
    submitListReplaceOp(p: Array<string | number>, li: any, ld?: any): Promise<this>;
    submitListInsertOp(p: Array<string | number>, li: any): Promise<this>;
    submitListDeleteOp(p: Array<string | number>, ld?: any): Promise<this>;
    submitNumberAddOp(p: Array<string | number>, na: number): Promise<this>;
    submitListSpliceOp(p: Array<string | number>, index: number, numToRemove: number, ...toAdd: Array<any>): Promise<this>;
    submitListPushOp(p: Array<string | number>, ...items: Array<any>): Promise<this>;
    submitListUnshiftOp(p: Array<string | number>, ...items: Array<any>): Promise<this>;
    abstract submitOp(ops: Array<ShareDB.Op>, source?: any): Promise<this>;
    abstract traverse(path: Array<string | number>): any;
}
