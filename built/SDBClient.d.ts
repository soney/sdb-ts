import { SDB } from './SDB';
import { ReconnectingWebsocket } from './utils';
/**
 * SDBClient is the wrapper for clients (usually run in the browser)
 */
export declare class SDBClient extends SDB {
    readonly ws: WebSocket | ReconnectingWebsocket;
    /**
     * Constructor
     * @param ws A WebSocket object that connects to the ShareDB server
     */
    constructor(ws: WebSocket | ReconnectingWebsocket);
    /**
     * Close up this client
     */
    close(): Promise<void>;
}
export { ReconnectingWebsocket };
