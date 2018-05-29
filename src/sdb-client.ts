import {SDB} from './sdb';
import * as ShareDBClient from 'sharedb/lib/client';

export class SDBClient extends SDB {
    constructor(readonly ws:WebSocket) {
        super();
        this.connection = new ShareDBClient.Connection(ws);
    };
    public close():Promise<void> {
        return Promise.resolve();
    };
};
