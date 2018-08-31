[sdb-ts](../README.md) > ["SDB"](../modules/_sdb_.md) > [SDB](../classes/_sdb_.sdb.md)

# Class: SDB

## Hierarchy

**SDB**

↳  [SDBClient](_sdbclient_.sdbclient.md)

↳  [SDBServer](_sdbserver_.sdbserver.md)

## Index

### Constructors

* [constructor](_sdb_.sdb.md#constructor)

### Properties

* [connection](_sdb_.sdb.md#connection)

### Methods

* [close](_sdb_.sdb.md#close)
* [deleteDoc](_sdb_.sdb.md#deletedoc)
* [get](_sdb_.sdb.md#get)
* [registerType](_sdb_.sdb.md#registertype)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new SDB**(): [SDB](_sdb_.sdb.md)

*Defined in [SDB.ts:6](https://github.com/soney/sdb-ts/blob/2988743/src/SDB.ts#L6)*

**Returns:** [SDB](_sdb_.sdb.md)

___

## Properties

<a id="connection"></a>

### `<Protected>` connection

**● connection**: *`ShareDB.Connection`*

*Defined in [SDB.ts:6](https://github.com/soney/sdb-ts/blob/2988743/src/SDB.ts#L6)*

___

## Methods

<a id="close"></a>

### `<Abstract>` close

▸ **close**(): `Promise`<`void`>

*Defined in [SDB.ts:43](https://github.com/soney/sdb-ts/blob/2988743/src/SDB.ts#L43)*

Close the connection (implemented by `SDBServer` and `SDBClient`)

**Returns:** `Promise`<`void`>

___
<a id="deletedoc"></a>

###  deleteDoc

▸ **deleteDoc**(doc: *[SDBDoc](_sdbdoc_.sdbdoc.md)<`any`>*): `void`

*Defined in [SDB.ts:50](https://github.com/soney/sdb-ts/blob/2988743/src/SDB.ts#L50)*

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

*Defined in [SDB.ts:21](https://github.com/soney/sdb-ts/blob/2988743/src/SDB.ts#L21)*

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

▸ **registerType**(type: *`object`*): `void`

*Defined in [SDB.ts:38](https://github.com/soney/sdb-ts/blob/2988743/src/SDB.ts#L38)*

Register a new ShareDB.OT type (see [https://github.com/ottypes/docs](https://github.com/ottypes/docs))

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| type | `object` |  The type object |

**Returns:** `void`

___

