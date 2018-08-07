import {SDBServer, SDBDoc} from '../built/index'; 
import * as http from 'http';
import * as WebSocket from 'ws';

const port = 3000;
const server = http.createServer();
const wss = new WebSocket.Server({ server });

const sdbServer = new SDBServer(wss);
const doc = sdbServer.get('touchdoc', 'touchdoc');
doc.createIfEmpty({
    tg: {},
    ps: {}
});

server.listen(port); 
console.log(`Listening on port ${port}`)