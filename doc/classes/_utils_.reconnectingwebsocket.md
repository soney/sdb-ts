[sdb-ts](../README.md) › [Globals](../globals.md) › ["utils"](../modules/_utils_.md) › [ReconnectingWebsocket](_utils_.reconnectingwebsocket.md)

# Class: ReconnectingWebsocket

## Hierarchy

* EventEmitter

  ↳ **ReconnectingWebsocket**

## Index

### Constructors

* [constructor](_utils_.reconnectingwebsocket.md#constructor)

### Properties

* [maxReconnectAttempts](_utils_.reconnectingwebsocket.md#maxreconnectattempts)
* [readyState](_utils_.reconnectingwebsocket.md#readystate)
* [reconnectInterval](_utils_.reconnectingwebsocket.md#reconnectinterval)
* [reconnectionDecay](_utils_.reconnectingwebsocket.md#reconnectiondecay)
* [timeoutInterval](_utils_.reconnectingwebsocket.md#timeoutinterval)
* [CLOSED](_utils_.reconnectingwebsocket.md#static-closed)
* [CLOSING](_utils_.reconnectingwebsocket.md#static-closing)
* [CONNECTING](_utils_.reconnectingwebsocket.md#static-connecting)
* [OPEN](_utils_.reconnectingwebsocket.md#static-open)
* [defaultMaxListeners](_utils_.reconnectingwebsocket.md#static-defaultmaxlisteners)

### Methods

* [addListener](_utils_.reconnectingwebsocket.md#addlistener)
* [close](_utils_.reconnectingwebsocket.md#close)
* [connect](_utils_.reconnectingwebsocket.md#connect)
* [emit](_utils_.reconnectingwebsocket.md#emit)
* [eventNames](_utils_.reconnectingwebsocket.md#eventnames)
* [getMaxListeners](_utils_.reconnectingwebsocket.md#getmaxlisteners)
* [listenerCount](_utils_.reconnectingwebsocket.md#listenercount)
* [listeners](_utils_.reconnectingwebsocket.md#listeners)
* [off](_utils_.reconnectingwebsocket.md#off)
* [on](_utils_.reconnectingwebsocket.md#on)
* [once](_utils_.reconnectingwebsocket.md#once)
* [onclose](_utils_.reconnectingwebsocket.md#onclose)
* [onconnecting](_utils_.reconnectingwebsocket.md#onconnecting)
* [onerror](_utils_.reconnectingwebsocket.md#onerror)
* [onmessage](_utils_.reconnectingwebsocket.md#onmessage)
* [onopen](_utils_.reconnectingwebsocket.md#onopen)
* [prependListener](_utils_.reconnectingwebsocket.md#prependlistener)
* [prependOnceListener](_utils_.reconnectingwebsocket.md#prependoncelistener)
* [rawListeners](_utils_.reconnectingwebsocket.md#rawlisteners)
* [removeAllListeners](_utils_.reconnectingwebsocket.md#removealllisteners)
* [removeListener](_utils_.reconnectingwebsocket.md#removelistener)
* [send](_utils_.reconnectingwebsocket.md#send)
* [setMaxListeners](_utils_.reconnectingwebsocket.md#setmaxlisteners)
* [listenerCount](_utils_.reconnectingwebsocket.md#static-listenercount)

## Constructors

###  constructor

\+ **new ReconnectingWebsocket**(`url`: string, `protocols?`: string | string[]): *[ReconnectingWebsocket](_utils_.reconnectingwebsocket.md)*

*Defined in [utils.ts:67](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`protocols?` | string &#124; string[] |

**Returns:** *[ReconnectingWebsocket](_utils_.reconnectingwebsocket.md)*

## Properties

###  maxReconnectAttempts

• **maxReconnectAttempts**: *number | false* = false

*Defined in [utils.ts:58](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L58)*

___

###  readyState

• **readyState**: *number*

*Defined in [utils.ts:51](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L51)*

___

###  reconnectInterval

• **reconnectInterval**: *number* = 1000

*Defined in [utils.ts:60](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L60)*

___

###  reconnectionDecay

• **reconnectionDecay**: *number* = 1.3

*Defined in [utils.ts:59](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L59)*

___

###  timeoutInterval

• **timeoutInterval**: *number* = 2000

*Defined in [utils.ts:61](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L61)*

___

### `Static` CLOSED

▪ **CLOSED**: *number* =  WebSocket.CLOSED

*Defined in [utils.ts:49](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L49)*

___

### `Static` CLOSING

▪ **CLOSING**: *number* =  WebSocket.CLOSING

*Defined in [utils.ts:48](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L48)*

___

### `Static` CONNECTING

▪ **CONNECTING**: *number* =  WebSocket.CONNECTING

*Defined in [utils.ts:46](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L46)*

___

### `Static` OPEN

▪ **OPEN**: *number* =  WebSocket.OPEN

*Defined in [utils.ts:47](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L47)*

___

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:9

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:11

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  close

▸ **close**(): *boolean*

*Defined in [utils.ts:133](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L133)*

**Returns:** *boolean*

___

###  connect

▸ **connect**(`reconnectionAttempt`: boolean): *void*

*Defined in [utils.ts:75](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L75)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`reconnectionAttempt` | boolean | false |

**Returns:** *void*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:23

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:24

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:20

**Returns:** *number*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:25

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:21

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:17

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:12

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:13

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  onclose

▸ **onclose**(): *void*

*Defined in [utils.ts:64](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L64)*

**Returns:** *void*

___

###  onconnecting

▸ **onconnecting**(): *void*

*Defined in [utils.ts:65](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L65)*

**Returns:** *void*

___

###  onerror

▸ **onerror**(): *void*

*Defined in [utils.ts:67](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L67)*

**Returns:** *void*

___

###  onmessage

▸ **onmessage**(): *void*

*Defined in [utils.ts:66](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L66)*

**Returns:** *void*

___

###  onopen

▸ **onopen**(): *void*

*Defined in [utils.ts:63](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L63)*

**Returns:** *void*

___

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:14

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:15

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:22

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:18

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:16

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  send

▸ **send**(`data`: any): *void*

*Defined in [utils.ts:125](https://github.com/soney/sdb-ts/blob/5c450be/src/utils.ts#L125)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *void*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:19

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:8

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
