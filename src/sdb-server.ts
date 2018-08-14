import * as http from 'http';
import * as WebSocket from 'ws';
import * as ShareDB from 'sharedb';
import * as net from 'net';
import { SDB } from './sdb';
import { Duplex } from 'stream';
import { extend } from './utils';
import { resolve } from 'path';
import { AddressInfo } from 'ws';

export interface SDBServerOptions {
    db?:ShareDB.DB,
    pubsub?:ShareDB.PubSub,
    disableDocAction?: boolean,
    disableSpaceDelimitedActions?: boolean
}

export class SDBServer extends SDB {
    private static optionDefaults: SDBServerOptions = {
        disableDocAction: true,
        disableSpaceDelimitedActions: true
    };
    private readonly share:ShareDB;
    private wssPromise: Promise<WebSocket.Server>;
    constructor(server?: WebSocket.Server | net.Server, options?:SDBServerOptions) {
        super();
        options = extend({}, options, SDBServer.optionDefaults);
        this.share = new ShareDB(options);
        this.connection = this.share.connect();

        if (server) {
            if (server instanceof WebSocket.Server) {
                this.wssPromise = Promise.resolve(server);
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
    };

    public address(): Promise<AddressInfo> {
        return this.wssPromise.then((wss) => wss.address() as AddressInfo );
    }

    public use(action:ShareDB.Action, fn:ShareDB.UseCallback):void {
        this.share.use(action, fn);
    };

    public close():Promise<void> {
        return new Promise((resolve, reject) => {
            this.share.close(()=> {
                resolve();
            });
        });
    };

    public listening(): Promise<void> {
        return this.wssPromise.then((wss) => {
            wss.once('listening', () => {
                resolve();
            });
        });
    }

    private listen(stream:WebSocketJSONStream):void {
        this.share.listen(stream);
    };
};

//Adapted from https://github.com/avital/websocket-json-stream
class WebSocketJSONStream extends Duplex {
    constructor(private readonly ws:WebSocket) {
        super({objectMode: true});
        this.ws.on('message', (msg: string) => {
            this.push(JSON.parse(msg))
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
    public _write(msg:any, encoding:string, next:Function):void {
        this.ws.send(JSON.stringify(msg));
        next();
    };
};

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