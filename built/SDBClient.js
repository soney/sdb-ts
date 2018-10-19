"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDB_1 = require("./SDB");
const ShareDBClient = require("sharedb/lib/client");
const utils_1 = require("./utils");
exports.ReconnectingWebsocket = utils_1.ReconnectingWebsocket;
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