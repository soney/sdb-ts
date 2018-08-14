"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const ShareDB = require("sharedb");
const net = require("net");
const sdb_1 = require("./sdb");
const stream_1 = require("stream");
const utils_1 = require("./utils");
const path_1 = require("path");
class SDBServer extends sdb_1.SDB {
    constructor(server, options) {
        super();
        options = utils_1.extend({}, options, SDBServer.optionDefaults);
        this.share = new ShareDB(options);
        this.connection = this.share.connect();
        if (server) {
            if (server instanceof WebSocket.Server) {
                this.wssPromise = Promise.resolve(server);
            }
            else if (server instanceof net.Server) {
                this.wssPromise = Promise.resolve(new WebSocket.Server({ server: server }));
            }
            else {
                throw new Error(`Could not recognize type of expected server ${server}`);
            }
        }
        else {
            this.wssPromise = getOpenPort().then((port) => {
                return new WebSocket.Server({ port });
            }).catch((err) => {
                throw (err);
            });
        }
        this.wssPromise.then((wss) => {
            wss.on('connection', (ws) => {
                const stream = new WebSocketJSONStream(ws);
                this.listen(stream);
            });
        });
    }
    ;
    address() {
        return this.wssPromise.then((wss) => wss.address());
    }
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
    listening() {
        return this.wssPromise.then((wss) => {
            wss.once('listening', () => {
                path_1.resolve();
            });
        });
    }
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
function getOpenPort() {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.unref();
        server.on('error', reject);
        server.listen(() => {
            const port = server.address().port;
            server.close(() => {
                resolve(port);
            });
        });
    });
}
//# sourceMappingURL=sdb-server.js.map