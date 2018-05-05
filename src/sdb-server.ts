import {SDB} from './sdb';
import * as ShareDB from 'sharedb';
import * as WebSocket from 'ws';
import {Duplex} from 'stream';

export class SDBServer extends SDB {
    private readonly share:ShareDB;
    constructor(options?:{wss?:WebSocket.Server, db?:ShareDB.DB, pubsub?:ShareDB.PubSub}) {
        super();
        this.share = new ShareDB(options);
        this.connection = this.share.connect();
        if(options && options.wss) {
            options.wss.on('connection', function(ws:WebSocket) {
                const stream = new WebSocketJSONStream(ws);
                this.listen(stream);
            });
        }
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