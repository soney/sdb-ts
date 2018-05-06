import { SDB } from './sdb';
export declare class SDBClient extends SDB {
    readonly ws: WebSocket;
    constructor(ws: WebSocket);
    close(): Promise<void>;
}
