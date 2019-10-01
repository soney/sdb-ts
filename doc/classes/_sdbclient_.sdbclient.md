[sdb-ts](../README.md) › [Globals](../globals.md) › ["SDBClient"](../modules/_sdbclient_.md) › [SDBClient](_sdbclient_.sdbclient.md)

# Class: SDBClient

SDBClient is the wrapper for clients (usually run in the browser)

## Hierarchy

* [SDB](_sdb_.sdb.md)

  ↳ **SDBClient**

## Index

### Constructors

* [constructor](_sdbclient_.sdbclient.md#constructor)

### Properties

* [connection](_sdbclient_.sdbclient.md#protected-connection)
* [ws](_sdbclient_.sdbclient.md#ws)

### Methods

* [close](_sdbclient_.sdbclient.md#close)
* [deleteDoc](_sdbclient_.sdbclient.md#deletedoc)
* [get](_sdbclient_.sdbclient.md#get)
* [registerType](_sdbclient_.sdbclient.md#static-registertype)

## Constructors

###  constructor

\+ **new SDBClient**(`ws`: WebSocket | [ReconnectingWebsocket](_utils_.reconnectingwebsocket.md)): *[SDBClient](_sdbclient_.sdbclient.md)*

*Overrides [SDB](_sdb_.sdb.md).[constructor](_sdb_.sdb.md#constructor)*

*Defined in [SDBClient.ts:8](https://github.com/soney/sdb-ts/blob/883d85d/src/SDBClient.ts#L8)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ws` | WebSocket &#124; [ReconnectingWebsocket](_utils_.reconnectingwebsocket.md) | A WebSocket object that connects to the ShareDB server  |

**Returns:** *[SDBClient](_sdbclient_.sdbclient.md)*

## Properties

### `Protected` connection

• **connection**: *ShareDB.Connection*

*Inherited from [SDB](_sdb_.sdb.md).[connection](_sdb_.sdb.md#protected-connection)*

*Defined in [SDB.ts:6](https://github.com/soney/sdb-ts/blob/883d85d/src/SDB.ts#L6)*

___

###  ws

• **ws**: *WebSocket | [ReconnectingWebsocket](_utils_.reconnectingwebsocket.md)*

*Defined in [SDBClient.ts:13](https://github.com/soney/sdb-ts/blob/883d85d/src/SDBClient.ts#L13)*

A WebSocket object that connects to the ShareDB server

## Methods

###  close

▸ **close**(): *Promise‹void›*

*Overrides [SDB](_sdb_.sdb.md).[close](_sdb_.sdb.md#abstract-close)*

*Defined in [SDBClient.ts:20](https://github.com/soney/sdb-ts/blob/883d85d/src/SDBClient.ts#L20)*

Close up this client

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
