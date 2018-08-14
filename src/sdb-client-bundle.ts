import { SDBDoc } from './SDBDoc';
import { SDBClient } from './SDBClient';
import { SDBSubDoc } from './SDBSubDoc';

// Put all of these under a global variable `SDB`
window['SDB'] = { SDBClient, SDBDoc, SDBSubDoc };