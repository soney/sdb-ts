import {SDB} from './sdb';
import * as ShareDB from 'sharedb';

export class SDBServer extends SDB {
    private readonly share:ShareDB;
    constructor(options?:{db?:ShareDB.DB, pubsub?:ShareDB.PubSub}) {
        super();
        this.share = new ShareDB(options);
        this.connection = this.share.connect();
    };

    public use(action:ShareDB.Action, fn:ShareDB.UseCallback):void {
        this.share.use(action, fn);
    };

    public close():Promise<void> {
        return new Promise((resolve, reject) => {
            this.share.close(()=> {
                resolve();
            });
        });
    };
    public listen(stream:any):void {
        this.share.listen(stream);
    };
};