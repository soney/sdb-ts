import * as ShareDB from 'sharedb';
export declare abstract class OpSubmittable {
    constructor();
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
    submitObjectReplaceOp(p: Array<string | number>, oi: any, od?: any): Promise<this>;
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
    submitObjectInsertOp(p: Array<string | number>, oi: any): Promise<this>;
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
    submitObjectDeleteOp(p: Array<string | number>, od?: any): Promise<this>;
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
    submitListReplaceOp(p: Array<string | number>, li: any, ld?: any): Promise<this>;
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
    submitListInsertOp(p: Array<string | number>, li: any): Promise<this>;
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
    submitListDeleteOp(p: Array<string | number>, ld?: any): Promise<this>;
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
    submitNumberAddOp(p: Array<string | number>, na: number): Promise<this>;
    /**
     * Perform a JavaScript splice operation
     *
     * @param p The path array
     * @param index Index at which to start changing the array (with origin 0).
     * @param numToRemove An integer indicating the number of old array elements to remove.
     * @param toAdd The elements to add to the array, beginning at `index`.
     */
    submitListSpliceOp(p: Array<string | number>, index: number, numToRemove: number, ...toAdd: Array<any>): Promise<this>;
    /**
     * Push any number of items to the end of the list.
     *
     * @param p The path array
     * @param items The items to add to the end of the list
     */
    submitListPushOp(p: Array<string | number>, ...items: Array<any>): Promise<this>;
    /**
     * Add any number of items to the beginning of a list
     *
     * @param p The path array
     * @param items The items to add to the beginning of the list
     */
    submitListUnshiftOp(p: Array<string | number>, ...items: Array<any>): Promise<this>;
    /**
     * Submit a raw series of ShareDB operations
     * @param ops The raw operations
     * @param source (optional) the change source
     */
    abstract submitOp(ops: Array<ShareDB.Op>, source?: any): Promise<this>;
    /**
     * Get the value at a given location in the document.
     * @param path The path array
     */
    abstract traverse(path: Array<string | number>): any;
}
