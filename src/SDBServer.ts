import * as http from 'http';
import * as WebSocket from 'ws';
import * as ShareDB from 'sharedb';
import * as net from 'net';
import { SDB } from './SDB';
import { Duplex } from 'stream';
import { extend } from './utils';
import { resolve } from 'path';
import { AddressInfo } from 'ws';

export interface SDBServerOptions {
    db?:ShareDB.DB,
    pubsub?:ShareDB.PubSub,
    disableDocAction?: boolean,
    disableSpaceDelimitedActions?: boolean,
    manualConnection?: boolean
}

/**
 * A class to wrap ShareDB servers (typically run in Node.js)
 */
export class SDBServer extends SDB {
    private static optionDefaults: SDBServerOptions = {
        disableDocAction: true,
        disableSpaceDelimitedActions: true
    };
    private readonly share:ShareDB; // The ShareDB object we are wrapping
    private wssPromise: Promise<WebSocket.Server>; // A promise wrapping our WebSocket server
    /**
     * 
     * @param server Either a WebSocket.Server object, a net.Server object (e.g., http.Server or https.Server in which case the constructor create a new WebSocket.Server) or ignored (in which case an open port is picked and a WebSocket.Server is created)
     * @param options Optional: options passed into ShareDB
     */
    constructor(server?: WebSocket.Server | net.Server, options?:SDBServerOptions) {
        super();
        options = extend({}, options as SDBServerOptions, SDBServer.optionDefaults);
        this.share = new ShareDB(options);

        if(!options.manualConnection) {
            this.connection = this.share.connect();
        }

        if (server) {
            if (server instanceof WebSocket.Server ||(server['clients'] && server['handleUpgrade'])) { // (use having .clients and .handleUpgrade as a proxy in case using a different version of WebSocket)
                this.wssPromise = Promise.resolve(server as WebSocket.Server);
            } else if(server instanceof net.Server) {
                this.wssPromise = Promise.resolve(new WebSocket.Server({ server: server as http.Server }));
            } else {
                throw new Error(`Could not recognize type of expected server ${server}`);
            }
        } else {
            this.wssPromise = getOpenPort().then((port) => {
                return new WebSocket.Server({ port });
            }).catch((err) => {
                throw(err);
            });
        }
        this.wssPromise.then((wss: WebSocket.Server) => {
            wss.on('connection', (ws:WebSocket): void => {
                const stream = new WebSocketJSONStream(ws);
                this.listen(stream);
            });
        });
    }

    /**
     * Get the raw backend object
     */
    public __backend__(): ShareDB {
        return this.share;
    }

    /**
     * A promise that gets the address for this server (mainly useful if this instance was called without a `server` argument)
     */
    public address(): Promise<AddressInfo> {
        return this.wssPromise.then((wss) => wss.address() as AddressInfo );
    }

    /**
     * For ShareDB Middlewares
     * @param action e.g., `'connect'`, `'op'`, ... (see ShareDB documentation)
     * @param fn Call this function at the time specified by `action`
     */
    public use(action:any, fn:(context: any, callback: (err?: any) => void) => void):void {
        this.share.use<any>(action, fn);
    };

    /**
     * Close and clean up this web server
     */
    public close():Promise<void> {
        return new Promise((resolve, reject) => {
            this.share.close(()=> {
                resolve();
            });
        });
    };

    /**
     * A promise that resolves (with no value) once the WebSocketServer is listening
     */
    public listening(): Promise<void> {
        return this.wssPromise.then((wss: WebSocket.Server) => {
            if(wss['readyState'] === wss['OPEN']) {
                return Promise.resolve();
            } else {
                return new Promise<void>((resolve, reject) => {
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
    private listen(stream:WebSocketJSONStream):void {
        this.share.listen(stream);
    };
};

// Adapted from https://github.com/avital/websocket-json-stream
class WebSocketJSONStream extends Duplex {
    constructor(private readonly ws:WebSocket) {
        super({objectMode: true});
        this.ws.on('message', (msg: string) => {
            try {
                this.push(JSON.parse(msg))
            } catch (err) {
                console.error(err);
            }
        });
        this.ws.on('close', () => {
            this.push(null); // end readable stream
            this.end(); // end writable stream

            this.emit('close');
            this.emit('end');
        });
        this.on('error', function() { ws.close(); });
        this.on('end',   function() { ws.close(); });
    };
    public _read():void {};
    public _write(msg:any, encoding:string, next: ()=>void):void {
        this.ws.send(JSON.stringify(msg));
        next();
    };
};

// Adapted from https://github.com/sindresorhus/get-port
function getOpenPort(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
        const server = net.createServer();
        server.unref();

        server.on('error', reject);
        server.listen(() => {
            const port: number = (server.address() as net.AddressInfo).port;

            server.close(() => {
                resolve(port);
            });
        });
    });
}