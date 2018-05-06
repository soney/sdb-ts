import { SDB } from './sdb';
import * as ShareDB from 'sharedb';
import * as WebSocket from 'ws';
export declare class SDBServer extends SDB {
    private readonly share;
    constructor(options?: {
        wss?: WebSocket.Server;
        db?: ShareDB.DB;
        pubsub?: ShareDB.PubSub;
    });
    use(action: ShareDB.Action, fn: ShareDB.UseCallback): void;
    close(): Promise<void>;
    private listen(stream);
}
