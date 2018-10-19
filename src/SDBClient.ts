import { SDB } from './SDB';
import * as ShareDBClient from 'sharedb/lib/client';
import { ReconnectingWebsocket } from './utils';

/**
 * SDBClient is the wrapper for clients (usually run in the browser)
 */
export class SDBClient extends SDB {
    /**
     * Constructor
     * @param ws A WebSocket object that connects to the ShareDB server
     */
    constructor (readonly ws: WebSocket | ReconnectingWebsocket) {
        super();
        this.connection = new ShareDBClient.Connection(ws as any);
    }
    /**
     * Close up this client
     */
    public close(): Promise<void> {
        return Promise.resolve();
    }
}

export { ReconnectingWebsocket };