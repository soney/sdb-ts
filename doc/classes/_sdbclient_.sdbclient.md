[sdb-ts](../README.md) > ["SDBClient"](../modules/_sdbclient_.md) > [SDBClient](../classes/_sdbclient_.sdbclient.md)

# Class: SDBClient

SDBClient is the wrapper for clients (usually run in the browser)

## Hierarchy

 [SDB](_sdb_.sdb.md)

**↳ SDBClient**

## Index

### Constructors

* [constructor](_sdbclient_.sdbclient.md#constructor)

### Properties

* [connection](_sdbclient_.sdbclient.md#connection)
* [ws](_sdbclient_.sdbclient.md#ws)

### Methods

* [close](_sdbclient_.sdbclient.md#close)
* [deleteDoc](_sdbclient_.sdbclient.md#deletedoc)
* [get](_sdbclient_.sdbclient.md#get)
* [registerType](_sdbclient_.sdbclient.md#registertype)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new SDBClient**(ws: *`WebSocket`*): [SDBClient](_sdbclient_.sdbclient.md)

*Overrides [SDB](_sdb_.sdb.md).[constructor](_sdb_.sdb.md#constructor)*

*Defined in SDBClient.ts:7*

Constructor

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ws | `WebSocket` |  A WebSocket object that connects to the ShareDB server |

**Returns:** [SDBClient](_sdbclient_.sdbclient.md)

___

## Properties

<a id="connection"></a>

### `<Protected>` connection

**● connection**: *`ShareDB.Connection`*

*Inherited from [SDB](_sdb_.sdb.md).[connection](_sdb_.sdb.md#connection)*

*Defined in SDB.ts:6*

___
<a id="ws"></a>

###  ws

**● ws**: *`WebSocket`*

*Defined in SDBClient.ts:12*

A WebSocket object that connects to the ShareDB server

___

## Methods

<a id="close"></a>

###  close

▸ **close**(): `Promise`<`void`>

*Overrides [SDB](_sdb_.sdb.md).[close](_sdb_.sdb.md#close)*

*Defined in SDBClient.ts:19*

Close up this client

**Returns:** `Promise`<`void`>

___
<a id="deletedoc"></a>

###  deleteDoc

▸ **deleteDoc**(doc: *[SDBDoc](_sdbdoc_.sdbdoc.md)<`any`>*): `void`

*Inherited from [SDB](_sdb_.sdb.md).[deleteDoc](_sdb_.sdb.md#deletedoc)*

*Defined in SDB.ts:50*

Delete a document from the list of documents (note this does not delete the document itself; it just cleans up some memory in the wrapper). You should not call this method; it will be automatically called by the document.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| doc | [SDBDoc](_sdbdoc_.sdbdoc.md)<`any`> |  The document to delete |

**Returns:** `void`

___
<a id="get"></a>

###  get

▸ **get**E(collectionName: *`string`*, documentID: *`string`*): [SDBDoc](_sdbdoc_.sdbdoc.md)<`E`>

*Inherited from [SDB](_sdb_.sdb.md).[get](_sdb_.sdb.md#get)*

*Defined in SDB.ts:21*

Get a document for this connection. (note that to create a new document, you call `.get()` and _then_ `.create()` or `.createIfEmpty()` on that doc)

**Type parameters:**

#### E 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| collectionName | `string` |  The collection ID |
| documentID | `string` |  The document ID |

**Returns:** [SDBDoc](_sdbdoc_.sdbdoc.md)<`E`>

___
<a id="registertype"></a>

### `<Static>` registerType

▸ **registerType**(type: *`any`*): `void`

*Inherited from [SDB](_sdb_.sdb.md).[registerType](_sdb_.sdb.md#registertype)*

*Defined in SDB.ts:38*

Register a new ShareDB.OT type (see [https://github.com/ottypes/docs](https://github.com/ottypes/docs))

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `any` |  The type object |

**Returns:** `void`

___

