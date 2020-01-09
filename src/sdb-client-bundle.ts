import { SDBDoc } from './SDBDoc';
import { SDBClient } from './SDBClient';
import { SDBSubDoc } from './SDBSubDoc';
import ReconnectingWebsocket from 'reconnecting-websocket';

// Put all of these under a global variable `SDB`
window['SDB'] = { ReconnectingWebsocket, SDBClient, SDBDoc, SDBSubDoc };