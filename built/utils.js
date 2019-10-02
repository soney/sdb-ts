"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const WebSocket = require("isomorphic-ws");
/**
 * Performs a shallow item-by-item comparison between two arrays.
 *
 * @param a The first array to compare
 * @param b The second array to compare
 *
 * @returns True if the two arrays are equal, false otherwise
 */
function isArrayEqual(a, b) {
    if (a.length === b.length) {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
}
exports.isArrayEqual = isArrayEqual;
/**
 * Assigns own enumerable string keyed properties of source objects to the destination object.
 * Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * @param obj The initial object (which will be mutated)
 * @param args Any number of objects to extend `obj` by
 * @returns obj
 */
function extend(obj, ...args) {
    args.forEach((arg) => {
        if (arg) {
            for (let prop in arg) {
                obj[prop] = arg[prop];
            }
        }
    });
    return obj;
}
exports.extend = extend;
// https://github.com/FahadAlbukhari/typescript-reconnecting-websocket/blob/master/reconnecting-websocket.ts
// https://github.com/joewalnes/reconnecting-websocket
class ReconnectingWebsocket extends events_1.EventEmitter {
    constructor(url, protocols) {
        super();
        this.url = url;
        this.protocols = protocols;
        this.forcedClose = false;
        this.timedOut = false;
        this.reconnectionAttempts = 0;
        this.maxReconnectAttempts = false;
        this.reconnectionDecay = 1.3;
        this.reconnectInterval = 1000;
        this.timeoutInterval = 2000;
        this.onopen = () => { };
        this.onclose = () => { };
        this.onconnecting = () => { };
        this.onmessage = () => { };
        this.onerror = () => { };
        this.readyState = ReconnectingWebsocket.CONNECTING;
        this.connect();
    }
    connect(reconnectionAttempt = false) {
        if (reconnectionAttempt) {
            if (this.maxReconnectAttempts !== false &&
                this.reconnectionAttempts > this.maxReconnectAttempts) {
                return;
            }
        }
        else {
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
            if (this.forcedClose) {
                this.readyState = ReconnectingWebsocket.CLOSED;
            }
            else {
                this.readyState = ReconnectingWebsocket.CONNECTING;
                this.onconnecting();
                this.emit('connecting');
                if (!reconnectionAttempt && !this.timedOut) {
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
    send(data) {
        if (this.ws) {
            this.ws.send(data);
        }
        else {
            throw new Error('INVALID_STATE_ERR : Pausing to reconnect websocket');
        }
    }
    close() {
        if (this.ws) {
            this.forcedClose = true;
            this.ws.close();
            return true;
        }
        else {
            return false;
        }
    }
}
exports.ReconnectingWebsocket = ReconnectingWebsocket;
ReconnectingWebsocket.CONNECTING = WebSocket.CONNECTING;
ReconnectingWebsocket.OPEN = WebSocket.OPEN;
ReconnectingWebsocket.CLOSING = WebSocket.CLOSING;
ReconnectingWebsocket.CLOSED = WebSocket.CLOSED;
//# sourceMappingURL=utils.js.map