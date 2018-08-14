import { SDB } from './SDB';
/**
 * SDBClient is the wrapper for clients (usually run in the browser)
 */
export declare class SDBClient extends SDB {
    readonly ws: WebSocket;
    /**
     * Constructor
     * @param ws A WebSocket object that connects to the ShareDB server
     */
    constructor(ws: WebSocket);
    /**
     * Close up this client
     */
    close(): Promise<void>;
}
