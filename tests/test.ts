import 'mocha';
import * as net from 'net';
import * as WebSocket from 'ws';
import { AddressInfo } from 'net';
import { ReconnectingWebsocket, SDBServer, SDBClient, SDBDoc } from '../built/index'; 
import { expect } from 'chai';
import { times, sample, isEqual } from 'lodash';
import { resolve } from 'path';


describe('Syncing Multiple Clients', async () => {
    await it('Clients synced', async () => {
        const sdbServer = new SDBServer();
        await sdbServer.listening();
        const address  = await sdbServer.address();
        const { port } = address;
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
        function rd(): SDBDoc<CounterDoc> { return sample(cCounterDocs); }
        function ec(f: (c: SDBDoc<CounterDoc>) => void): void { cCounterDocs.forEach((c) => f(c)); }
        const d = rd();
        await d.subscribe();
        await sCounterDoc.subscribe();

        expect(d.getData()).is.eql(sCounterDoc.getData());
        sCounterDoc.submitNumberAddOp(['counter'], 1);
        await delay(10);
        expect(d.getData()).is.eql(sCounterDoc.getData());

        const subDoc = d.subDoc(['sd']);

        await subDoc.subscribe();
        expect(subDoc.getData()).is.eql(sCounterDoc.getData()['sd']);

        subDoc.submitObjectReplaceOp(['numEx'], 33);
        await delay(10);
        expect(subDoc.traverse(['numEx'])).is.eql(sCounterDoc.traverse(['sd', 'numEx']));


        await sdbServer.close();
        console.log(`Closed server`);
        socketClients.forEach((client) => {
            client.close();
        });
    });

    // sdbClients.forEach((c) => c.close());

});


function delay(ms: number):Promise<null> {
    return new Promise<null> ((resolve) => {
        setTimeout(()=> resolve(null), ms);
    });
}