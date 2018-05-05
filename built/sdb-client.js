"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdb_1 = require("./sdb");
const ShareDBClient = require("sharedb/lib/client");
class SDBClient extends sdb_1.SDB {
    constructor(ws) {
        super();
        this.ws = ws;
        this.connection = new ShareDBClient.Connection(ws);
    }
    ;
    close() {
        return Promise.resolve();
    }
    ;
}
exports.SDBClient = SDBClient;
;
//# sourceMappingURL=sdb-client.js.map