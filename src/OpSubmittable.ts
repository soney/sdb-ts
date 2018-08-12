import * as ShareDB from 'sharedb';

export abstract class OpSubmittable {
    public constructor() { };
    public async submitObjectReplaceOp(p:Array<string|number>, oi:any, od:any=this.traverse(p)):Promise<this>   { return await this.submitOp([{p,oi,od}]); };
    public async submitObjectInsertOp (p:Array<string|number>, oi:any):Promise<this>                            { return await this.submitOp([{p,oi}]);    };
    public async submitObjectDeleteOp (p:Array<string|number>, od:any=this.traverse(p)):Promise<this>           { return await this.submitOp([{p,od}]);    };
    public async submitListReplaceOp  (p:Array<string|number>, li:any, ld:any=this.traverse(p)):Promise<this>   { return await this.submitOp([{p,li,ld}]); };
    public async submitListInsertOp   (p:Array<string|number>, li:any):Promise<this>                            { return await this.submitOp([{p,li}]);    };
    public async submitListDeleteOp   (p:Array<string|number>, ld:any=this.traverse(p)):Promise<this>           { return await this.submitOp([{p,ld}]);    };
    public async submitNumberAddOp    (p:Array<string|number>, na:number):Promise<this>                         { return await this.submitOp([{p, na}]);   };

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
    public async submitListPushOp(p:Array<string|number>, ...items:Array<any>):Promise<this> {
        const arr:Array<any> = this.traverse(p);
        const previousLength:number = arr.length;
        const ops:Array<ShareDB.Op> = items.map((x:any, i:number) => {
            const op:ShareDB.Op = {p:p.concat(previousLength+i), li:x};
            return op;
        });
        return await this.submitOp(ops);
    };
    public async submitListUnshiftOp(p:Array<string|number>, ...items:Array<any>):Promise<this> {
        const arr:Array<any> = this.traverse(p);
        const previousLength:number = arr.length;
        const ops:Array<ShareDB.Op> = items.map((x:any, i:number) => {
            const op:ShareDB.Op = {p:p.concat(i), li:x};
            return op;
        });
        return await this.submitOp(ops);
    };
    public abstract submitOp(ops:Array<ShareDB.Op>, source? :any):Promise<this>;
    public abstract traverse(path:Array<string|number>):any;
};
