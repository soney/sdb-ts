[sdb-ts](../README.md) › [Globals](../globals.md) › ["SDBServer"](../modules/_sdbserver_.md) › [SDBServer](_sdbserver_.sdbserver.md)

# Class: SDBServer

A class to wrap ShareDB servers (typically run in Node.js)

## Hierarchy

* [SDB](_sdb_.sdb.md)

  ↳ **SDBServer**

## Index

### Constructors

* [constructor](_sdbserver_.sdbserver.md#constructor)

### Properties

* [connection](_sdbserver_.sdbserver.md#protected-connection)

### Methods

* [address](_sdbserver_.sdbserver.md#address)
* [close](_sdbserver_.sdbserver.md#close)
* [deleteDoc](_sdbserver_.sdbserver.md#deletedoc)
* [get](_sdbserver_.sdbserver.md#get)
* [listening](_sdbserver_.sdbserver.md#listening)
* [use](_sdbserver_.sdbserver.md#use)
* [registerType](_sdbserver_.sdbserver.md#static-registertype)

## Constructors

###  constructor

\+ **new SDBServer**(`server?`: Server | Server, `options?`: [SDBServerOptions](../interfaces/_sdbserver_.sdbserveroptions.md)): *[SDBServer](_sdbserver_.sdbserver.md)*

*Overrides [SDB](_sdb_.sdb.md).[constructor](_sdb_.sdb.md#constructor)*

*Defined in [SDBServer.ts:27](https://github.com/soney/sdb-ts/blob/883d85d/src/SDBServer.ts#L27)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`server?` | Server &#124; Server | Either a WebSocket.Server object, a net.Server object (e.g., http.Server or https.Server in which case the constructor create a new WebSocket.Server) or ignored (in which case an open port is picked and a WebSocket.Server is created) |
`options?` | [SDBServerOptions](../interfaces/_sdbserver_.sdbserveroptions.md) | Optional: options passed into ShareDB  |

**Returns:** *[SDBServer](_sdbserver_.sdbserver.md)*

## Properties

### `Protected` connection

• **connection**: *ShareDB.Connection*

*Inherited from [SDB](_sdb_.sdb.md).[connection](_sdb_.sdb.md#protected-connection)*

*Defined in [SDB.ts:6](https://github.com/soney/sdb-ts/blob/883d85d/src/SDB.ts#L6)*

## Methods

###  address

▸ **address**(): *Promise‹AddressInfo›*

*Defined in [SDBServer.ts:65](https://github.com/soney/sdb-ts/blob/883d85d/src/SDBServer.ts#L65)*

A promise that gets the address for this server (mainly useful if this instance was called without a `server` argument)

**Returns:** *Promise‹AddressInfo›*

___

###  close

▸ **close**(): *Promise‹void›*

*Overrides [SDB](_sdb_.sdb.md).[close](_sdb_.sdb.md#abstract-close)*

*Defined in [SDBServer.ts:81](https://github.com/soney/sdb-ts/blob/883d85d/src/SDBServer.ts#L81)*

Close and clean up this web server

**Returns:** *Promise‹void›*

___

###  deleteDoc

▸ **deleteDoc**(`doc`: [SDBDoc](_sdbdoc_.sdbdoc.md)‹any›): *void*

*Inherited from [SDB](_sdb_.sdb.md).[deleteDoc](_sdb_.sdb.md#deletedoc)*

*Defined in [SDB.ts:50](https://github.com/soney/sdb-ts/blob/883d85d/src/SDB.ts#L50)*

Delete a document from the list of documents (note this does not delete the document itself; it just cleans up some memory in the wrapper).
You should not call this method; it will be automatically called by the document.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`doc` | [SDBDoc](_sdbdoc_.sdbdoc.md)‹any› | The document to delete  |

**Returns:** *void*

___

###  get

▸ **get**<**E**>(`collectionName`: string, `documentID`: string): *[SDBDoc](_sdbdoc_.sdbdoc.md)‹E›*

*Inherited from [SDB](_sdb_.sdb.md).[get](_sdb_.sdb.md#get)*

*Defined in [SDB.ts:21](https://github.com/soney/sdb-ts/blob/883d85d/src/SDB.ts#L21)*

Get a document for this connection. (note that to create a new document, you call `.get()` and *then* `.create()` or `.createIfEmpty()` on that doc)

**Type parameters:**

▪ **E**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`collectionName` | string | The collection ID |
`documentID` | string | The document ID  |

**Returns:** *[SDBDoc](_sdbdoc_.sdbdoc.md)‹E›*

___

###  listening

▸ **listening**(): *Promise‹void›*

*Defined in [SDBServer.ts:92](https://github.com/soney/sdb-ts/blob/883d85d/src/SDBServer.ts#L92)*

A promise that resolves (with no value) once the WebSocketServer is listening

**Returns:** *Promise‹void›*

___

###  use

▸ **use**(`action`: any, `fn`: function): *void*

*Defined in [SDBServer.ts:74](https://github.com/soney/sdb-ts/blob/883d85d/src/SDBServer.ts#L74)*

For ShareDB Middlewares

**Parameters:**

▪ **action**: *any*

e.g., `'connect'`, `'op'`, ... (see ShareDB documentation)

▪ **fn**: *function*

Call this function at the time specified by `action`

▸ (`context`: any, `callback`: function): *void*

**Parameters:**

▪ **context**: *any*

▪ **callback**: *function*

▸ (`err?`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err?` | any |

**Returns:** *void*

___

### `Static` registerType

▸ **registerType**(`type`: object): *void*

*Inherited from [SDB](_sdb_.sdb.md).[registerType](_sdb_.sdb.md#static-registertype)*

*Defined in [SDB.ts:38](https://github.com/soney/sdb-ts/blob/883d85d/src/SDB.ts#L38)*

Register a new ShareDB.OT type (see [https://github.com/ottypes/docs](https://github.com/ottypes/docs))

**Parameters:**

▪ **type**: *object*

The type object

Name | Type |
------ | ------ |
`name?` | string |
`uri?` | string |

**Returns:** *void*
