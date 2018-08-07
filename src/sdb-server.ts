import {SDB} from './sdb';
import * as ShareDB from 'sharedb';
import * as WebSocket from 'ws';
import {Duplex} from 'stream';
import {extend} from 'lodash';

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
    constructor(wss: WebSocket.Server, options?:SDBServerOptions) {
        super();
        options = extend({}, options, SDBServer.optionDefaults);
        this.share = new ShareDB(options);
        this.connection = this.share.connect();
        wss.on('connection', (ws:WebSocket): void => {
            const stream = new WebSocketJSONStream(ws);
            this.listen(stream);
        });
    };

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
    private listen(stream:Duplex):void {
        this.share.listen(stream);
    };
};

//Adapted from https://github.com/avital/websocket-json-stream
class WebSocketJSONStream extends Duplex {
    constructor(private readonly ws:WebSocket) {
        super({objectMode: true});
        this.ws.on('message', (msg) => {
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