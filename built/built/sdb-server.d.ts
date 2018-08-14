/// <reference types="node" />
import * as WebSocket from 'ws';
import * as ShareDB from 'sharedb';
import * as net from 'net';
import { SDB } from './sdb';
import { AddressInfo } from 'ws';
export interface SDBServerOptions {
    db?: ShareDB.DB;
    pubsub?: ShareDB.PubSub;
    disableDocAction?: boolean;
    disableSpaceDelimitedActions?: boolean;
}
export declare class SDBServer extends SDB {
    private static optionDefaults;
    private readonly share;
    private wssPromise;
    constructor(server?: WebSocket.Server | net.Server, options?: SDBServerOptions);
    address(): Promise<AddressInfo>;
    use(action: ShareDB.Action, fn: ShareDB.UseCallback): void;
    close(): Promise<void>;
    listening(): Promise<void>;
    private listen;
}
