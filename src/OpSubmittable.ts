import * as ShareDB from 'sharedb';

export abstract class OpSubmittable {
    public constructor() { };
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
    public async submitObjectReplaceOp(p:Array<string|number>, oi:any, od:any=this.traverse(p)):Promise<this>   { return await this.submitOp([{p,oi,od}]); };
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
    public async submitObjectInsertOp (p:Array<string|number>, oi:any):Promise<this>                            { return await this.submitOp([{p,oi}]);    };
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
    public async submitObjectDeleteOp (p:Array<string|number>, od:any=this.traverse(p)):Promise<this>           { return await this.submitOp([{p,od}]);    };
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
    public async submitListReplaceOp  (p:Array<string|number>, li:any, ld:any=this.traverse(p)):Promise<this>   { return await this.submitOp([{p,li,ld}]); };
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
    public async submitListInsertOp   (p:Array<string|number>, li:any):Promise<this>                            { return await this.submitOp([{p,li}]);    };
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
    public async submitListDeleteOp   (p:Array<string|number>, ld:any=this.traverse(p)):Promise<this>           { return await this.submitOp([{p,ld}]);    };

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
    public async submitNumberAddOp    (p:Array<string|number>, na:number):Promise<this>                         { return await this.submitOp([{p, na}]);   };

    /**
     * Perform a JavaScript splice operation
     * 
     * @param p The path array
     * @param index Index at which to start changing the array (with origin 0).
     * @param numToRemove An integer indicating the number of old array elements to remove.
     * @param toAdd The elements to add to the array, beginning at `index`.
     */
    public async submitListSpliceOp(p:Array<string|number>, index:number, numToRemove:number, ...toAdd:Array<any>):Promise<this> {
        const listDeleteOps:Array<ShareDB.Op> = [];
        const item:any = this.traverse(p);
        for(let i:number = index+numToRemove-1; i>=index; i--) {
            const pi:Array<string|number> = p.concat([i]);
            listDeleteOps.push({
                p: pi,
                ld: item[i]
            });
        }

        const listInsertOps:Array<ShareDB.Op> = toAdd.map((li:any, i:number) => {
            return { p: p.concat([index+i]), li };
        });

        return await this.submitOp(listDeleteOps.concat(listInsertOps));
    };

    /**
     * Push any number of items to the end of the list.
     * 
     * @param p The path array
     * @param items The items to add to the end of the list
     */
    public async submitListPushOp(p:Array<string|number>, ...items:Array<any>):Promise<this> {
        const arr:Array<any> = this.traverse(p);
        const previousLength:number = arr.length;
        const ops:Array<ShareDB.Op> = items.map((x:any, i:number) => {
            const op:ShareDB.Op = {p:p.concat(previousLength+i), li:x};
            return op;
        });
        return await this.submitOp(ops);
    };

    /**
     * Add any number of items to the beginning of a list
     * 
     * @param p The path array
     * @param items The items to add to the beginning of the list
     */
    public async submitListUnshiftOp(p:Array<string|number>, ...items:Array<any>):Promise<this> {
        const arr:Array<any> = this.traverse(p);
        const previousLength:number = arr.length;
        const ops:Array<ShareDB.Op> = items.map((x:any, i:number) => {
            const op:ShareDB.Op = {p:p.concat(i), li:x};
            return op;
        });
        return await this.submitOp(ops);
    };

    /**
     * Submit a raw series of ShareDB operations
     * @param ops The raw operations
     * @param source (optional) the change source
     */
    public abstract submitOp(ops:Array<ShareDB.Op>, source? :any):Promise<this>;

    /**
     * Get the value at a given location in the document.
     * @param path The path array
     */
    public abstract traverse(path:Array<string|number>):any;
};
