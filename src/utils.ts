import { EventEmitter } from "events";
import * as WebSocket from 'isomorphic-ws';

/**
 * Performs a shallow item-by-item comparison between two arrays.
 * 
 * @param a The first array to compare
 * @param b The second array to compare
 * 
 * @returns True if the two arrays are equal, false otherwise
 */
export function isArrayEqual(a: ReadonlyArray<any>, b: ReadonlyArray<any>): boolean {
    if ( a.length === b.length ) {
        for(let i: number = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
}

/**
 * Assigns own enumerable string keyed properties of source objects to the destination object.
 * Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 * 
 * @param obj The initial object (which will be mutated)
 * @param args Any number of objects to extend `obj` by
 * @returns obj
 */
export function extend(obj: {[key: string]: any}, ...args: {[key: string]: any}[]): {[key: string]: any} {
    args.forEach((arg: {[key: string]: any}) => {
        if(arg) {
            for (let prop in arg) {
                obj[prop] = arg[prop];
            }
        }
    });
    return obj;
}

// https://github.com/FahadAlbukhari/typescript-reconnecting-websocket/blob/master/reconnecting-websocket.ts
// https://github.com/joewalnes/reconnecting-websocket
export class ReconnectingWebsocket extends EventEmitter {
    public static CONNECTING: number = WebSocket.CONNECTING;
    public static OPEN: number = WebSocket.OPEN;
    public static CLOSING: number = WebSocket.CLOSING;
    public static CLOSED: number = WebSocket.CLOSED;

    public readyState: number;
    private ws: WebSocket;
    private forcedClose: boolean = false;
    private timedOut: boolean = false;

    private reconnectionAttempts: number = 0;

    public maxReconnectAttempts: number|false = false;
    public reconnectionDecay: number = 1.3;
    public reconnectInterval: number = 1000;
    public timeoutInterval: number = 2000;

    public onopen: ((ev) => void) = () => {};
    public onclose: ((ev) => void) = () => {};
    public onconnecting: (() => void) = () => {};
    public onmessage: ((ev) => void) = () => {};
    public onerror: ((ev) => void) = () => {};

    public constructor(private url: string, private protocols?: string | string[]) {
        super();
        this.readyState = ReconnectingWebsocket.CONNECTING;
        this.connect();
    }

    public connect(reconnectionAttempt: boolean = false): void {
        if(reconnectionAttempt) {
            if( this.maxReconnectAttempts !== false &&
               this.reconnectionAttempts > this.maxReconnectAttempts) {
                return;
            }
        } else {
            this.reconnectionAttempts = 0;
        }

        this.ws = new WebSocket(this.url, this.protocols);
        this.ws.addEventListener('open', (event) => {
            this.reconnectionAttempts = 0;
            this.readyState = ReconnectingWebsocket.OPEN;
            this.onopen(event);
            this.emit('open', event);
        });

        this.ws.addEventListener('close', (event) => {
            this.ws = null;
            if(this.forcedClose) {
                this.readyState = ReconnectingWebsocket.CLOSED;
            } else {
                this.readyState = ReconnectingWebsocket.CONNECTING;
                this.onconnecting();
                this.emit('connecting');

                if(!reconnectionAttempt && !this.timedOut) {
                    this.onclose(event);
                }

                const timeout = this.reconnectInterval * Math.pow(this.reconnectionDecay, this.reconnectionAttempts);
                setTimeout(() => {
                    this.reconnectionAttempts++;
                    this.connect(true);
                }, timeout);
            }
        });

        this.ws.addEventListener('message', (event) => {
            this.onmessage(event);
            this.emit('message', event);
        });

        this.ws.addEventListener('error', (event) => {
            this.onerror(event);
            this.emit('error', event);
        });
    }

    public send(data: any): void {
        if(this.ws) {
            this.ws.send(data);
        } else {
            throw new Error('INVALID_STATE_ERR : Pausing to reconnect websocket')
        }
    }

    public close(): boolean {
        if(this.ws) {
            this.forcedClose = true;
            this.ws.close();
            return true;
        } else {
            return false;
        }
    }
}