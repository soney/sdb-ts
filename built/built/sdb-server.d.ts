import { SDB } from './sdb';
import * as ShareDB from 'sharedb';
import * as WebSocket from 'ws';
export interface SDBServerOptions {
    db?: ShareDB.DB;
    pubsub?: ShareDB.PubSub;
    disableDocAction?: boolean;
    disableSpaceDelimitedActions?: boolean;
}
export declare class SDBServer extends SDB {
    private static optionDefaults;
    private readonly share;
    constructor(wss: WebSocket.Server, options?: SDBServerOptions);
    use(action: ShareDB.Action, fn: ShareDB.UseCallback): void;
    close(): Promise<void>;
    private listen;
}
