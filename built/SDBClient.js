"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDB_1 = require("./SDB");
const ShareDBClient = require("sharedb/lib/client");
const reconnecting_websocket_1 = require("reconnecting-websocket");
exports.ReconnectingWebsocket = reconnecting_websocket_1.default;
/**
 * SDBClient is the wrapper for clients (usually run in the browser)
 */
class SDBClient extends SDB_1.SDB {
    /**
     * Constructor
     * @param ws A WebSocket object that connects to the ShareDB server
     */
    constructor(ws) {
        super();
        this.ws = ws;
        this.connection = new ShareDBClient.Connection(ws);
    }
    /**
     * Close up this client
     */
    close() {
        return Promise.resolve();
    }
}
exports.SDBClient = SDBClient;
//# sourceMappingURL=SDBClient.js.map