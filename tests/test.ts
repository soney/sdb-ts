import 'mocha';
import * as http from 'http';
import * as WebSocket from 'ws';
import { SDBServer, SDBClient, SDBDoc } from '../built/index'; 
import { AddressInfo } from 'net';
import { expect } from 'chai';
import { times, sample, isEqual } from 'lodash';

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const sdbServer = new SDBServer(wss);

server.listen(); 
const port: number = (server.address() as AddressInfo).port;
console.log(`Created server on port ${port}`);

interface CounterDoc {
    counter: number;
    sd: {
        strEx: string;
        numEx: number;
    };
}

const socketClients = times<WebSocket>(5, () => new WebSocket(`ws://localhost:${port}/`) );
const sdbClients = socketClients.map((ws:any) => new SDBClient(ws) );

const sCounterDoc: SDBDoc<CounterDoc> = sdbServer.get('ex', 'counter');
const cCounterDocs: SDBDoc<CounterDoc>[] = sdbClients.map((c) => c.get('ex', 'counter'));

sCounterDoc.createIfEmpty({
    counter: 0,
    sd: {
        strEx: 'ABC',
        numEx: 3
    }
});

describe('Syncing Multiple Clients', async () => {
    function rd(): SDBDoc<CounterDoc> { return sample(cCounterDocs); }
    await it('Clients synced', async () => {
        const d = rd();
        await d.subscribe();
        console.log(d.getData());
    });

    sdbClients.forEach((c) => c.close());

    server.close();
    console.log(`Closing server`);
});


function delay(ms: number):Promise<null> {
    return new Promise<null> ((resolve) => {
        setTimeout(()=> resolve(null), ms);
    });
}