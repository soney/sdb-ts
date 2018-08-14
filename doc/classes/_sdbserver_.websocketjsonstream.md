[sdb-ts](../README.md) > ["SDBServer"](../modules/_sdbserver_.md) > [WebSocketJSONStream](../classes/_sdbserver_.websocketjsonstream.md)

# Class: WebSocketJSONStream

## Hierarchy

 `Duplex`

**↳ WebSocketJSONStream**

## Implements

* `ReadableStream`
* `Writable`

## Index

### Constructors

* [constructor](_sdbserver_.websocketjsonstream.md#constructor)

### Properties

* [readable](_sdbserver_.websocketjsonstream.md#readable)
* [readableHighWaterMark](_sdbserver_.websocketjsonstream.md#readablehighwatermark)
* [readableLength](_sdbserver_.websocketjsonstream.md#readablelength)
* [writable](_sdbserver_.websocketjsonstream.md#writable)
* [writableHighWaterMark](_sdbserver_.websocketjsonstream.md#writablehighwatermark)
* [writableLength](_sdbserver_.websocketjsonstream.md#writablelength)
* [defaultMaxListeners](_sdbserver_.websocketjsonstream.md#defaultmaxlisteners)

### Methods

* [__@asyncIterator](_sdbserver_.websocketjsonstream.md#___asynciterator)
* [_destroy](_sdbserver_.websocketjsonstream.md#_destroy)
* [_final](_sdbserver_.websocketjsonstream.md#_final)
* [_read](_sdbserver_.websocketjsonstream.md#_read)
* [_write](_sdbserver_.websocketjsonstream.md#_write)
* [_writev](_sdbserver_.websocketjsonstream.md#_writev)
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
* [listenerCount](_sdbserver_.websocketjsonstream.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new WebSocketJSONStream**(ws: *`WebSocket`*): [WebSocketJSONStream](_sdbserver_.websocketjsonstream.md)

*Overrides Duplex.__constructor*

*Defined in SDBServer.ts:115*

**Parameters:**

| Param | Type |
| ------ | ------ |
| ws | `WebSocket` |

**Returns:** [WebSocketJSONStream](_sdbserver_.websocketjsonstream.md)

___

## Properties

<a id="readable"></a>

###  readable

**● readable**: *`boolean`*

*Inherited from Readable.readable*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6055*

___
<a id="readablehighwatermark"></a>

###  readableHighWaterMark

**● readableHighWaterMark**: *`number`*

*Inherited from Readable.readableHighWaterMark*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6056*

___
<a id="readablelength"></a>

###  readableLength

**● readableLength**: *`number`*

*Inherited from Readable.readableLength*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6057*

___
<a id="writable"></a>

###  writable

**● writable**: *`boolean`*

*Inherited from Duplex.writable*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6242*

___
<a id="writablehighwatermark"></a>

###  writableHighWaterMark

**● writableHighWaterMark**: *`number`*

*Inherited from Duplex.writableHighWaterMark*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6243*

___
<a id="writablelength"></a>

###  writableLength

**● writableLength**: *`number`*

*Inherited from Duplex.writableLength*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6244*

___
<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:1025*

___

## Methods

<a id="___asynciterator"></a>

###  __@asyncIterator

▸ **__@asyncIterator**(): `AsyncIterableIterator`<`any`>

*Inherited from Readable.[Symbol.asyncIterator]*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6130*

**Returns:** `AsyncIterableIterator`<`any`>

___
<a id="_destroy"></a>

###  _destroy

▸ **_destroy**(error: * `Error` &#124; `null`*, callback: *`function`*): `void`

*Inherited from Duplex._destroy*

*Overrides Readable._destroy*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6248*

**Parameters:**

| Param | Type |
| ------ | ------ |
| error |  `Error` &#124; `null`|
| callback | `function` |

**Returns:** `void`

___
<a id="_final"></a>

###  _final

▸ **_final**(callback: *`function`*): `void`

*Inherited from Duplex._final*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6249*

**Parameters:**

| Param | Type |
| ------ | ------ |
| callback | `function` |

**Returns:** `void`

___
<a id="_read"></a>

###  _read

▸ **_read**(): `void`

*Overrides Readable._read*

*Defined in SDBServer.ts:131*

**Returns:** `void`

___
<a id="_write"></a>

###  _write

▸ **_write**(msg: *`any`*, encoding: *`string`*, next: *`Function`*): `void`

*Overrides Duplex._write*

*Defined in SDBServer.ts:132*

**Parameters:**

| Param | Type |
| ------ | ------ |
| msg | `any` |
| encoding | `string` |
| next | `Function` |

**Returns:** `void`

___
<a id="_writev"></a>

### `<Optional>` _writev

▸ **_writev**(chunks: *`Array`<`object`>*, callback: *`function`*): `void`

*Inherited from Duplex._writev*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6247*

**Parameters:**

| Param | Type |
| ------ | ------ |
| chunks | `Array`<`object`> |
| callback | `function` |

**Returns:** `void`

___
<a id="addlistener"></a>

###  addListener

▸ **addListener**(event: *"close"*, listener: *`function`*): `this`

▸ **addListener**(event: *"data"*, listener: *`function`*): `this`

▸ **addListener**(event: *"end"*, listener: *`function`*): `this`

▸ **addListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **addListener**(event: *"error"*, listener: *`function`*): `this`

▸ **addListener**(event: * `string` &#124; `symbol`*, listener: *`function`*): `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6081*

Event emitter The defined events on documents including:

1.  close
2.  data
3.  end
4.  readable
5.  error

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6082*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6083*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6084*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6085*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6086*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event |  `string` &#124; `symbol`|
| listener | `function` |

**Returns:** `this`

___
<a id="cork"></a>

###  cork

▸ **cork**(): `void`

*Inherited from Duplex.cork*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6256*

**Returns:** `void`

___
<a id="destroy"></a>

###  destroy

▸ **destroy**(error?: *`Error`*): `void`

*Inherited from Readable.destroy*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6070*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` error | `Error` |

**Returns:** `void`

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *"close"*): `boolean`

▸ **emit**(event: *"data"*, chunk: *`any`*): `boolean`

▸ **emit**(event: *"end"*): `boolean`

▸ **emit**(event: *"readable"*): `boolean`

▸ **emit**(event: *"error"*, err: *`Error`*): `boolean`

▸ **emit**(event: * `string` &#124; `symbol`*, ...args: *`any`[]*): `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6088*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "close" |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6089*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "data" |
| chunk | `any` |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6090*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "end" |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6091*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "readable" |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6092*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "error" |
| err | `Error` |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6093*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event |  `string` &#124; `symbol`|
| `Rest` args | `any`[] |

**Returns:** `boolean`

___
<a id="end"></a>

###  end

▸ **end**(cb?: *`function`*): `void`

▸ **end**(chunk: *`any`*, cb?: *`function`*): `void`

▸ **end**(chunk: *`any`*, encoding?: *`string`*, cb?: *`function`*): `void`

*Inherited from Duplex.end*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6253*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` cb | `function` |

**Returns:** `void`

*Inherited from Duplex.end*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6254*

**Parameters:**

| Param | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` cb | `function` |

**Returns:** `void`

*Inherited from Duplex.end*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6255*

**Parameters:**

| Param | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` encoding | `string` |
| `Optional` cb | `function` |

**Returns:** `void`

___
<a id="eventnames"></a>

###  eventNames

▸ **eventNames**(): `Array`< `string` &#124; `symbol`>

*Inherited from EventEmitter.eventNames*

*Overrides EventEmitter.eventNames*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:1040*

**Returns:** `Array`< `string` &#124; `symbol`>

___
<a id="getmaxlisteners"></a>

###  getMaxListeners

▸ **getMaxListeners**(): `number`

*Inherited from EventEmitter.getMaxListeners*

*Overrides EventEmitter.getMaxListeners*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:1036*

**Returns:** `number`

___
<a id="ispaused"></a>

###  isPaused

▸ **isPaused**(): `boolean`

*Inherited from Readable.isPaused*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6064*

**Returns:** `boolean`

___
<a id="listenercount"></a>

###  listenerCount

▸ **listenerCount**(type: * `string` &#124; `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Overrides EventEmitter.listenerCount*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:1041*

**Parameters:**

| Param | Type |
| ------ | ------ |
| type |  `string` &#124; `symbol`|

**Returns:** `number`

___
<a id="listeners"></a>

###  listeners

▸ **listeners**(event: * `string` &#124; `symbol`*): `Function`[]

*Inherited from EventEmitter.listeners*

*Overrides EventEmitter.listeners*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:1037*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event |  `string` &#124; `symbol`|

**Returns:** `Function`[]

___
<a id="off"></a>

###  off

▸ **off**(event: * `string` &#124; `symbol`*, listener: *`function`*): `this`

*Inherited from EventEmitter.off*

*Overrides EventEmitter.off*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:1033*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event |  `string` &#124; `symbol`|
| listener | `function` |

**Returns:** `this`

___
<a id="on"></a>

###  on

▸ **on**(event: *"close"*, listener: *`function`*): `this`

▸ **on**(event: *"data"*, listener: *`function`*): `this`

▸ **on**(event: *"end"*, listener: *`function`*): `this`

▸ **on**(event: *"readable"*, listener: *`function`*): `this`

▸ **on**(event: *"error"*, listener: *`function`*): `this`

▸ **on**(event: * `string` &#124; `symbol`*, listener: *`function`*): `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6095*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6096*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6097*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6098*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6099*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6100*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event |  `string` &#124; `symbol`|
| listener | `function` |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**(event: *"close"*, listener: *`function`*): `this`

▸ **once**(event: *"data"*, listener: *`function`*): `this`

▸ **once**(event: *"end"*, listener: *`function`*): `this`

▸ **once**(event: *"readable"*, listener: *`function`*): `this`

▸ **once**(event: *"error"*, listener: *`function`*): `this`

▸ **once**(event: * `string` &#124; `symbol`*, listener: *`function`*): `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6102*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6103*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6104*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6105*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6106*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6107*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event |  `string` &#124; `symbol`|
| listener | `function` |

**Returns:** `this`

___
<a id="pause"></a>

###  pause

▸ **pause**(): `this`

*Inherited from Readable.pause*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6062*

**Returns:** `this`

___
<a id="pipe"></a>

###  pipe

▸ **pipe**T(destination: *`T`*, options?: *`object`*): `T`

*Inherited from internal.pipe*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6040*

**Type parameters:**

#### T :  `WritableStream`
**Parameters:**

| Param | Type |
| ------ | ------ |
| destination | `T` |
| `Optional` options | `object` |

**Returns:** `T`

___
<a id="prependlistener"></a>

###  prependListener

▸ **prependListener**(event: *"close"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"data"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"end"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"error"*, listener: *`function`*): `this`

▸ **prependListener**(event: * `string` &#124; `symbol`*, listener: *`function`*): `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6109*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6110*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6111*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6112*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6113*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6114*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event |  `string` &#124; `symbol`|
| listener | `function` |

**Returns:** `this`

___
<a id="prependoncelistener"></a>

###  prependOnceListener

▸ **prependOnceListener**(event: *"close"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"data"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"end"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"error"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: * `string` &#124; `symbol`*, listener: *`function`*): `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6116*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6117*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6118*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6119*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6120*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6121*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event |  `string` &#124; `symbol`|
| listener | `function` |

**Returns:** `this`

___
<a id="push"></a>

###  push

▸ **push**(chunk: *`any`*, encoding?: *`string`*): `boolean`

*Inherited from Readable.push*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6068*

**Parameters:**

| Param | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` encoding | `string` |

**Returns:** `boolean`

___
<a id="rawlisteners"></a>

###  rawListeners

▸ **rawListeners**(event: * `string` &#124; `symbol`*): `Function`[]

*Inherited from EventEmitter.rawListeners*

*Overrides EventEmitter.rawListeners*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:1038*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event |  `string` &#124; `symbol`|

**Returns:** `Function`[]

___
<a id="read"></a>

###  read

▸ **read**(size?: *`number`*): `any`

*Inherited from Readable.read*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6060*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` size | `number` |

**Returns:** `any`

___
<a id="removealllisteners"></a>

###  removeAllListeners

▸ **removeAllListeners**(event?: * `string` &#124; `symbol`*): `this`

*Inherited from EventEmitter.removeAllListeners*

*Overrides EventEmitter.removeAllListeners*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:1034*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` event |  `string` &#124; `symbol`|

**Returns:** `this`

___
<a id="removelistener"></a>

###  removeListener

▸ **removeListener**(event: *"close"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"data"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"end"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"error"*, listener: *`function`*): `this`

▸ **removeListener**(event: * `string` &#124; `symbol`*, listener: *`function`*): `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6123*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6124*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6125*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6126*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6127*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6128*

**Parameters:**

| Param | Type |
| ------ | ------ |
| event |  `string` &#124; `symbol`|
| listener | `function` |

**Returns:** `this`

___
<a id="resume"></a>

###  resume

▸ **resume**(): `this`

*Inherited from Readable.resume*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6063*

**Returns:** `this`

___
<a id="setdefaultencoding"></a>

###  setDefaultEncoding

▸ **setDefaultEncoding**(encoding: *`string`*): `this`

*Inherited from Duplex.setDefaultEncoding*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6252*

**Parameters:**

| Param | Type |
| ------ | ------ |
| encoding | `string` |

**Returns:** `this`

___
<a id="setencoding"></a>

###  setEncoding

▸ **setEncoding**(encoding: *`string`*): `this`

*Inherited from Readable.setEncoding*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6061*

**Parameters:**

| Param | Type |
| ------ | ------ |
| encoding | `string` |

**Returns:** `this`

___
<a id="setmaxlisteners"></a>

###  setMaxListeners

▸ **setMaxListeners**(n: *`number`*): `this`

*Inherited from EventEmitter.setMaxListeners*

*Overrides EventEmitter.setMaxListeners*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:1035*

**Parameters:**

| Param | Type |
| ------ | ------ |
| n | `number` |

**Returns:** `this`

___
<a id="uncork"></a>

###  uncork

▸ **uncork**(): `void`

*Inherited from Duplex.uncork*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6257*

**Returns:** `void`

___
<a id="unpipe"></a>

###  unpipe

▸ **unpipe**T(destination?: *`T`*): `this`

*Inherited from Readable.unpipe*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6065*

**Type parameters:**

#### T :  `WritableStream`
**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` destination | `T` |

**Returns:** `this`

___
<a id="unshift"></a>

###  unshift

▸ **unshift**(chunk: *`any`*): `void`

*Inherited from Readable.unshift*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6066*

**Parameters:**

| Param | Type |
| ------ | ------ |
| chunk | `any` |

**Returns:** `void`

___
<a id="wrap"></a>

###  wrap

▸ **wrap**(oldStream: *`ReadableStream`*): `this`

*Inherited from Readable.wrap*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6067*

**Parameters:**

| Param | Type |
| ------ | ------ |
| oldStream | `ReadableStream` |

**Returns:** `this`

___
<a id="write"></a>

###  write

▸ **write**(chunk: *`any`*, cb?: *`function`*): `boolean`

▸ **write**(chunk: *`any`*, encoding?: *`string`*, cb?: *`function`*): `boolean`

*Inherited from Duplex.write*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6250*

**Parameters:**

| Param | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` cb | `function` |

**Returns:** `boolean`

*Inherited from Duplex.write*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:6251*

**Parameters:**

| Param | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` encoding | `string` |
| `Optional` cb | `function` |

**Returns:** `boolean`

___
<a id="listenercount-1"></a>

### `<Static>` listenerCount

▸ **listenerCount**(emitter: *`EventEmitter`*, event: * `string` &#124; `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Defined in /home/soney/code/sdb-ts/node_modules/@types/node/index.d.ts:1024*

*__deprecated__*: since v4.0.0

**Parameters:**

| Param | Type |
| ------ | ------ |
| emitter | `EventEmitter` |
| event |  `string` &#124; `symbol`|

**Returns:** `number`

___

