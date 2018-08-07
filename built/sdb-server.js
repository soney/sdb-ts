"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdb_1 = require("./sdb");
const ShareDB = require("sharedb");
const stream_1 = require("stream");
const lodash_1 = require("lodash");
class SDBServer extends sdb_1.SDB {
    constructor(wss, options) {
        super();
        options = lodash_1.extend({}, options, SDBServer.optionDefaults);
        this.share = new ShareDB(options);
        this.connection = this.share.connect();
        wss.on('connection', (ws) => {
            const stream = new WebSocketJSONStream(ws);
            this.listen(stream);
        });
    }
    ;
    use(action, fn) {
        this.share.use(action, fn);
    }
    ;
    close() {
        return new Promise((resolve, reject) => {
            this.share.close(() => {
                resolve();
            });
        });
    }
    ;
    listen(stream) {
        this.share.listen(stream);
    }
    ;
}
SDBServer.optionDefaults = {
    disableDocAction: true,
    disableSpaceDelimitedActions: true
};
exports.SDBServer = SDBServer;
;
//Adapted from https://github.com/avital/websocket-json-stream
class WebSocketJSONStream extends stream_1.Duplex {
    constructor(ws) {
        super({ objectMode: true });
        this.ws = ws;
        this.ws.on('message', (msg) => {
            this.push(JSON.parse(msg));
        });
        this.ws.on('close', () => {
            this.push(null); // end readable stream
            this.end(); // end writable stream
            this.emit('close');
            this.emit('end');
        });
        this.on('error', function () { ws.close(); });
        this.on('end', function () { ws.close(); });
    }
    ;
    _read() { }
    ;
    _write(msg, encoding, next) {
        this.ws.send(JSON.stringify(msg));
        next();
    }
    ;
}
;
//# sourceMappingURL=sdb-server.js.map