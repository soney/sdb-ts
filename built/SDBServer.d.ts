/// <reference types="node" />
import * as WebSocket from 'ws';
import * as ShareDB from 'sharedb';
import * as net from 'net';
import { SDB } from './SDB';
import { AddressInfo } from 'ws';
export interface SDBServerOptions {
    db?: ShareDB.DB;
    pubsub?: ShareDB.PubSub;
    disableDocAction?: boolean;
    disableSpaceDelimitedActions?: boolean;
    manualConnection?: boolean;
}
/**
 * A class to wrap ShareDB servers (typically run in Node.js)
 */
export declare class SDBServer extends SDB {
    private static optionDefaults;
    private readonly share;
    private wssPromise;
    /**
     *
     * @param server Either a WebSocket.Server object, a net.Server object (e.g., http.Server or https.Server in which case the constructor create a new WebSocket.Server) or ignored (in which case an open port is picked and a WebSocket.Server is created)
     * @param options Optional: options passed into ShareDB
     */
    constructor(server?: WebSocket.Server | net.Server, options?: SDBServerOptions);
    /**
     * Get the raw backend object
     */
    __backend__(): ShareDB;
    /**
     * A promise that gets the address for this server (mainly useful if this instance was called without a `server` argument)
     */
    address(): Promise<AddressInfo>;
    /**
     * For ShareDB Middlewares
     * @param action e.g., `'connect'`, `'op'`, ... (see ShareDB documentation)
     * @param fn Call this function at the time specified by `action`
     */
    use(action: any, fn: (context: any, callback: (err?: any) => void) => void): void;
    /**
     * Close and clean up this web server
     */
    close(): Promise<void>;
    /**
     * A promise that resolves (with no value) once the WebSocketServer is listening
     */
    listening(): Promise<void>;
    /**
     * For when a client connects (do not call this; it will be called automatically)
     */
    private listen;
}
