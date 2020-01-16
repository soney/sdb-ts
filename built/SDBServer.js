"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const ShareDB = require("sharedb");
const net = require("net");
const SDB_1 = require("./SDB");
const stream_1 = require("stream");
const utils_1 = require("./utils");
/**
 * A class to wrap ShareDB servers (typically run in Node.js)
 */
class SDBServer extends SDB_1.SDB {
    /**
     *
     * @param server Either a WebSocket.Server object, a net.Server object (e.g., http.Server or https.Server in which case the constructor create a new WebSocket.Server) or ignored (in which case an open port is picked and a WebSocket.Server is created)
     * @param options Optional: options passed into ShareDB
     */
    constructor(server, options) {
        super();
        options = utils_1.extend({}, options, SDBServer.optionDefaults);
        this.share = new ShareDB(options);
        if (!options.manualConnection) {
            this.connection = this.share.connect();
        }
        if (server) {
            if (server instanceof WebSocket.Server || (server['clients'] && server['handleUpgrade'])) { // (use having .clients and .handleUpgrade as a proxy in case using a different version of WebSocket)
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
        this.wssPromise.then(this.addWSSConnectionListener.bind(this));
    }
    addWSSConnectionListener(wss) {
        wss.on('connection', (ws) => {
            const stream = new WebSocketJSONStream(ws);
            this.listen(stream);
        });
    }
    /**
     * Get the raw backend object
     */
    __backend__() {
        return this.share;
    }
    /**
     * A promise that gets the address for this server (mainly useful if this instance was called without a `server` argument)
     */
    address() {
        return this.wssPromise.then((wss) => wss.address());
    }
    /**
     * For ShareDB Middlewares
     * @param action e.g., `'connect'`, `'op'`, ... (see ShareDB documentation)
     * @param fn Call this function at the time specified by `action`
     */
    use(action, fn) {
        this.share.use(action, fn);
    }
    ;
    /**
     * Close and clean up this web server
     */
    close() {
        return new Promise((resolve, reject) => {
            this.share.close(() => {
                resolve();
            });
        });
    }
    ;
    /**
     * A promise that resolves (with no value) once the WebSocketServer is listening
     */
    listening() {
        return this.wssPromise.then((wss) => {
            if (wss['readyState'] === wss['OPEN']) {
                return Promise.resolve();
            }
            else {
                return new Promise((resolve, reject) => {
                    wss.once('listening', () => {
                        resolve();
                    });
                });
            }
        });
    }
    /**
     * For when a client connects (do not call this; it will be called automatically)
     */
    listen(stream) {
        this.share.listen(stream);
    }
    ;
}
exports.SDBServer = SDBServer;
SDBServer.optionDefaults = {
    disableDocAction: true,
    disableSpaceDelimitedActions: true
};
;
// Adapted from https://github.com/avital/websocket-json-stream
class WebSocketJSONStream extends stream_1.Duplex {
    constructor(ws) {
        super({ objectMode: true });
        this.ws = ws;
        this.ws.on('message', (msg) => {
            try {
                this.push(JSON.parse(msg));
            }
            catch (err) {
                console.error(err);
            }
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
exports.WebSocketJSONStream = WebSocketJSONStream;
;
// Adapted from https://github.com/sindresorhus/get-port
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
//# sourceMappingURL=SDBServer.js.map