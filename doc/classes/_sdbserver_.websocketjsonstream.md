[sdb-ts](../README.md) › [Globals](../globals.md) › ["SDBServer"](../modules/_sdbserver_.md) › [WebSocketJSONStream](_sdbserver_.websocketjsonstream.md)

# Class: WebSocketJSONStream

## Hierarchy

* Duplex

  ↳ **WebSocketJSONStream**

## Implements

* ReadableStream
* Writable

## Index

### Constructors

* [constructor](_sdbserver_.websocketjsonstream.md#constructor)

### Properties

* [destroyed](_sdbserver_.websocketjsonstream.md#destroyed)
* [readable](_sdbserver_.websocketjsonstream.md#readable)
* [readableHighWaterMark](_sdbserver_.websocketjsonstream.md#readablehighwatermark)
* [readableLength](_sdbserver_.websocketjsonstream.md#readablelength)
* [writable](_sdbserver_.websocketjsonstream.md#writable)
* [writableFinished](_sdbserver_.websocketjsonstream.md#writablefinished)
* [writableHighWaterMark](_sdbserver_.websocketjsonstream.md#writablehighwatermark)
* [writableLength](_sdbserver_.websocketjsonstream.md#writablelength)
* [defaultMaxListeners](_sdbserver_.websocketjsonstream.md#static-defaultmaxlisteners)

### Methods

* [__@asyncIterator](_sdbserver_.websocketjsonstream.md#__@asynciterator)
* [_destroy](_sdbserver_.websocketjsonstream.md#_destroy)
* [_final](_sdbserver_.websocketjsonstream.md#_final)
* [_read](_sdbserver_.websocketjsonstream.md#_read)
* [_write](_sdbserver_.websocketjsonstream.md#_write)
* [_writev](_sdbserver_.websocketjsonstream.md#optional-_writev)
* [addListener](_sdbserver_.websocketjsonstream.md#addlistener)
* [cork](_sdbserver_.websocketjsonstream.md#cork)
* [destroy](_sdbserver_.websocketjsonstream.md#destroy)
* [emit](_sdbserver_.websocketjsonstream.md#emit)
* [end](_sdbserver_.websocketjsonstream.md#end)
* [eventNames](_sdbserver_.websocketjsonstream.md#eventnames)
* [getMaxListeners](_sdbserver_.websocketjsonstream.md#getmaxlisteners)
* [isPaused](_sdbserver_.websocketjsonstream.md#ispaused)
* [listenerCount](_sdbserver_.websocketjsonstream.md#listenercount)
* [listeners](_sdbserver_.websocketjsonstream.md#listeners)
* [off](_sdbserver_.websocketjsonstream.md#off)
* [on](_sdbserver_.websocketjsonstream.md#on)
* [once](_sdbserver_.websocketjsonstream.md#once)
* [pause](_sdbserver_.websocketjsonstream.md#pause)
* [pipe](_sdbserver_.websocketjsonstream.md#pipe)
* [prependListener](_sdbserver_.websocketjsonstream.md#prependlistener)
* [prependOnceListener](_sdbserver_.websocketjsonstream.md#prependoncelistener)
* [push](_sdbserver_.websocketjsonstream.md#push)
* [rawListeners](_sdbserver_.websocketjsonstream.md#rawlisteners)
* [read](_sdbserver_.websocketjsonstream.md#read)
* [removeAllListeners](_sdbserver_.websocketjsonstream.md#removealllisteners)
* [removeListener](_sdbserver_.websocketjsonstream.md#removelistener)
* [resume](_sdbserver_.websocketjsonstream.md#resume)
* [setDefaultEncoding](_sdbserver_.websocketjsonstream.md#setdefaultencoding)
* [setEncoding](_sdbserver_.websocketjsonstream.md#setencoding)
* [setMaxListeners](_sdbserver_.websocketjsonstream.md#setmaxlisteners)
* [uncork](_sdbserver_.websocketjsonstream.md#uncork)
* [unpipe](_sdbserver_.websocketjsonstream.md#unpipe)
* [unshift](_sdbserver_.websocketjsonstream.md#unshift)
* [wrap](_sdbserver_.websocketjsonstream.md#wrap)
* [write](_sdbserver_.websocketjsonstream.md#write)
* [from](_sdbserver_.websocketjsonstream.md#static-from)
* [listenerCount](_sdbserver_.websocketjsonstream.md#static-listenercount)

## Constructors

###  constructor

\+ **new WebSocketJSONStream**(`ws`: WebSocket): *[WebSocketJSONStream](_sdbserver_.websocketjsonstream.md)*

*Overrides void*

*Defined in [SDBServer.ts:115](https://github.com/soney/sdb-ts/blob/2d09328/src/SDBServer.ts#L115)*

**Parameters:**

Name | Type |
------ | ------ |
`ws` | WebSocket |

**Returns:** *[WebSocketJSONStream](_sdbserver_.websocketjsonstream.md)*

## Properties

###  destroyed

• **destroyed**: *boolean*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:29

___

###  readable

• **readable**: *boolean*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:26

___

###  readableHighWaterMark

• **readableHighWaterMark**: *number*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:27

___

###  readableLength

• **readableLength**: *number*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:28

___

###  writable

• **writable**: *boolean*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:219

___

###  writableFinished

• **writableFinished**: *boolean*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:220

___

###  writableHighWaterMark

• **writableHighWaterMark**: *number*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:221

___

###  writableLength

• **writableLength**: *number*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:222

___

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/events.d.ts:9

## Methods

###  __@asyncIterator

▸ **__@asyncIterator**(): *AsyncIterableIterator‹any›*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:102

**Returns:** *AsyncIterableIterator‹any›*

___

###  _destroy

▸ **_destroy**(`error`: Error | null, `callback`: function): *void*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:226

**Parameters:**

▪ **error**: *Error | null*

▪ **callback**: *function*

▸ (`error`: Error | null): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | Error &#124; null |

**Returns:** *void*

___

###  _final

▸ **_final**(`callback`: function): *void*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:227

**Parameters:**

▪ **callback**: *function*

▸ (`error?`: Error | null): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error?` | Error &#124; null |

**Returns:** *void*

___

###  _read

▸ **_read**(): *void*

*Overrides void*

*Defined in [SDBServer.ts:135](https://github.com/soney/sdb-ts/blob/2d09328/src/SDBServer.ts#L135)*

**Returns:** *void*

___

###  _write

▸ **_write**(`msg`: any, `encoding`: string, `next`: function): *void*

*Overrides void*

*Defined in [SDBServer.ts:136](https://github.com/soney/sdb-ts/blob/2d09328/src/SDBServer.ts#L136)*

**Parameters:**

▪ **msg**: *any*

▪ **encoding**: *string*

▪ **next**: *function*

▸ (): *void*

**Returns:** *void*

___

### `Optional` _writev

▸ **_writev**(`chunks`: Array‹object›, `callback`: function): *void*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:225

**Parameters:**

▪ **chunks**: *Array‹object›*

▪ **callback**: *function*

▸ (`error?`: Error | null): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error?` | Error &#124; null |

**Returns:** *void*

___

###  addListener

▸ **addListener**(`event`: "close", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:53

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. readable
5. error

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: "data", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:54

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **addListener**(`event`: "end", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:55

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: "readable", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:56

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: "error", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:57

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

**Returns:** *this*

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:58

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

###  cork

▸ **cork**(): *void*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:234

**Returns:** *void*

___

###  destroy

▸ **destroy**(`error?`: Error): *void*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:42

**Parameters:**

Name | Type |
------ | ------ |
`error?` | Error |

**Returns:** *void*

___

###  emit

▸ **emit**(`event`: "close"): *boolean*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:60

**Parameters:**

Name | Type |
------ | ------ |
`event` | "close" |

**Returns:** *boolean*

▸ **emit**(`event`: "data", `chunk`: any): *boolean*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:61

**Parameters:**

Name | Type |
------ | ------ |
`event` | "data" |
`chunk` | any |

**Returns:** *boolean*

▸ **emit**(`event`: "end"): *boolean*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:62

**Parameters:**

Name | Type |
------ | ------ |
`event` | "end" |

**Returns:** *boolean*

▸ **emit**(`event`: "readable"): *boolean*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:63

**Parameters:**

Name | Type |
------ | ------ |
`event` | "readable" |

**Returns:** *boolean*

▸ **emit**(`event`: "error", `err`: Error): *boolean*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:64

**Parameters:**

Name | Type |
------ | ------ |
`event` | "error" |
`err` | Error |

**Returns:** *boolean*

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:65

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  end

▸ **end**(`cb?`: function): *void*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:231

**Parameters:**

▪`Optional`  **cb**: *function*

▸ (): *void*

**Returns:** *void*

▸ **end**(`chunk`: any, `cb?`: function): *void*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:232

**Parameters:**

▪ **chunk**: *any*

▪`Optional`  **cb**: *function*

▸ (): *void*

**Returns:** *void*

▸ **end**(`chunk`: any, `encoding?`: string, `cb?`: function): *void*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:233

**Parameters:**

▪ **chunk**: *any*

▪`Optional`  **encoding**: *string*

▪`Optional`  **cb**: *function*

▸ (): *void*

**Returns:** *void*

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

###  isPaused

▸ **isPaused**(): *boolean*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:36

**Returns:** *boolean*

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

▸ **on**(`event`: "close", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:67

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "data", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:68

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **on**(`event`: "end", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:69

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "readable", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:70

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "error", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:71

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

**Returns:** *this*

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:72

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

▸ **once**(`event`: "close", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:74

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: "data", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:75

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **once**(`event`: "end", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:76

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: "readable", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:77

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: "error", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:78

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

**Returns:** *this*

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:79

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

###  pause

▸ **pause**(): *this*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:34

**Returns:** *this*

___

###  pipe

▸ **pipe**<**T**>(`destination`: T, `options?`: object): *T*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:5

**Type parameters:**

▪ **T**: *WritableStream*

**Parameters:**

▪ **destination**: *T*

▪`Optional`  **options**: *object*

Name | Type |
------ | ------ |
`end?` | boolean |

**Returns:** *T*

___

###  prependListener

▸ **prependListener**(`event`: "close", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:81

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: "data", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:82

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **prependListener**(`event`: "end", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:83

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: "readable", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:84

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: "error", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:85

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

**Returns:** *this*

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:86

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

▸ **prependOnceListener**(`event`: "close", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:88

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: "data", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:89

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **prependOnceListener**(`event`: "end", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:90

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: "readable", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:91

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: "error", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:92

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

**Returns:** *this*

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:93

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

###  push

▸ **push**(`chunk`: any, `encoding?`: string): *boolean*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:40

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |
`encoding?` | string |

**Returns:** *boolean*

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

###  read

▸ **read**(`size?`: number): *any*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:32

**Parameters:**

Name | Type |
------ | ------ |
`size?` | number |

**Returns:** *any*

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

▸ **removeListener**(`event`: "close", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:95

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: "data", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:96

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **removeListener**(`event`: "end", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:97

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: "readable", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:98

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: "error", `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:99

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

**Returns:** *this*

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:100

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

###  resume

▸ **resume**(): *this*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:35

**Returns:** *this*

___

###  setDefaultEncoding

▸ **setDefaultEncoding**(`encoding`: string): *this*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:230

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | string |

**Returns:** *this*

___

###  setEncoding

▸ **setEncoding**(`encoding`: string): *this*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | string |

**Returns:** *this*

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

###  uncork

▸ **uncork**(): *void*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:235

**Returns:** *void*

___

###  unpipe

▸ **unpipe**(`destination?`: WritableStream): *this*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:37

**Parameters:**

Name | Type |
------ | ------ |
`destination?` | WritableStream |

**Returns:** *this*

___

###  unshift

▸ **unshift**(`chunk`: any, `encoding?`: BufferEncoding): *void*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:38

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |
`encoding?` | BufferEncoding |

**Returns:** *void*

___

###  wrap

▸ **wrap**(`oldStream`: ReadableStream): *this*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:39

**Parameters:**

Name | Type |
------ | ------ |
`oldStream` | ReadableStream |

**Returns:** *this*

___

###  write

▸ **write**(`chunk`: any, `encoding?`: string, `cb?`: function): *boolean*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:228

**Parameters:**

▪ **chunk**: *any*

▪`Optional`  **encoding**: *string*

▪`Optional`  **cb**: *function*

▸ (`error`: Error | null | undefined): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | Error &#124; null &#124; undefined |

**Returns:** *boolean*

▸ **write**(`chunk`: any, `cb?`: function): *boolean*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:229

**Parameters:**

▪ **chunk**: *any*

▪`Optional`  **cb**: *function*

▸ (`error`: Error | null | undefined): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error` | Error &#124; null &#124; undefined |

**Returns:** *boolean*

___

### `Static` from

▸ **from**(`iterable`: Iterable‹any› | AsyncIterable‹any›, `options?`: ReadableOptions): *Readable*

*Inherited from void*

Defined in /Users/soney/code/sdb-ts/node_modules/@types/node/stream.d.ts:24

A utility method for creating Readable Streams out of iterators.

**Parameters:**

Name | Type |
------ | ------ |
`iterable` | Iterable‹any› &#124; AsyncIterable‹any› |
`options?` | ReadableOptions |

**Returns:** *Readable*

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
