[sdb-ts](../README.md) › [Globals](../globals.md) › ["SDB"](../modules/_sdb_.md) › [SDB](_sdb_.sdb.md)

# Class: SDB

## Hierarchy

* **SDB**

  ↳ [SDBClient](_sdbclient_.sdbclient.md)

  ↳ [SDBServer](_sdbserver_.sdbserver.md)

## Index

### Constructors

* [constructor](_sdb_.sdb.md#constructor)

### Properties

* [connection](_sdb_.sdb.md#protected-connection)

### Methods

* [close](_sdb_.sdb.md#abstract-close)
* [deleteDoc](_sdb_.sdb.md#deletedoc)
* [get](_sdb_.sdb.md#get)
* [registerType](_sdb_.sdb.md#static-registertype)

## Constructors

###  constructor

\+ **new SDB**(): *[SDB](_sdb_.sdb.md)*

*Defined in [SDB.ts:6](https://github.com/soney/sdb-ts/blob/883d85d/src/SDB.ts#L6)*

**Returns:** *[SDB](_sdb_.sdb.md)*

## Properties

### `Protected` connection

• **connection**: *ShareDB.Connection*

*Defined in [SDB.ts:6](https://github.com/soney/sdb-ts/blob/883d85d/src/SDB.ts#L6)*

## Methods

### `Abstract` close

▸ **close**(): *Promise‹void›*

*Defined in [SDB.ts:43](https://github.com/soney/sdb-ts/blob/883d85d/src/SDB.ts#L43)*

Close the connection (implemented by `SDBServer` and `SDBClient`)

**Returns:** *Promise‹void›*

___

###  deleteDoc

▸ **deleteDoc**(`doc`: [SDBDoc](_sdbdoc_.sdbdoc.md)‹any›): *void*

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
