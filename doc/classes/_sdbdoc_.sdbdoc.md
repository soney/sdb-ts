[sdb-ts](../README.md) > ["SDBDoc"](../modules/_sdbdoc_.md) > [SDBDoc](../classes/_sdbdoc_.sdbdoc.md)

# Class: SDBDoc

A class that represents a ShareDB document. This class uses generics: `const doc: SDBDooc<{x: number}> = client.get('docs', 'doc1')`

## Type parameters
#### E 
## Hierarchy

 [OpSubmittable](_opsubmittable_.opsubmittable.md)

**↳ SDBDoc**

## Index

### Constructors

* [constructor](_sdbdoc_.sdbdoc.md#constructor)

### Methods

* [create](_sdbdoc_.sdbdoc.md#create)
* [createIfEmpty](_sdbdoc_.sdbdoc.md#createifempty)
* [del](_sdbdoc_.sdbdoc.md#del)
* [destroy](_sdbdoc_.sdbdoc.md#destroy)
* [doSubmitOp](_sdbdoc_.sdbdoc.md#dosubmitop)
* [fetch](_sdbdoc_.sdbdoc.md#fetch)
* [getData](_sdbdoc_.sdbdoc.md#getdata)
* [getIdentifier](_sdbdoc_.sdbdoc.md#getidentifier)
* [subDoc](_sdbdoc_.sdbdoc.md#subdoc)
* [submitListDeleteOp](_sdbdoc_.sdbdoc.md#submitlistdeleteop)
* [submitListInsertOp](_sdbdoc_.sdbdoc.md#submitlistinsertop)
* [submitListPushOp](_sdbdoc_.sdbdoc.md#submitlistpushop)
* [submitListReplaceOp](_sdbdoc_.sdbdoc.md#submitlistreplaceop)
* [submitListSpliceOp](_sdbdoc_.sdbdoc.md#submitlistspliceop)
* [submitListUnshiftOp](_sdbdoc_.sdbdoc.md#submitlistunshiftop)
* [submitNumberAddOp](_sdbdoc_.sdbdoc.md#submitnumberaddop)
* [submitObjectDeleteOp](_sdbdoc_.sdbdoc.md#submitobjectdeleteop)
* [submitObjectInsertOp](_sdbdoc_.sdbdoc.md#submitobjectinsertop)
* [submitObjectReplaceOp](_sdbdoc_.sdbdoc.md#submitobjectreplaceop)
* [submitOp](_sdbdoc_.sdbdoc.md#submitop)
* [subscribe](_sdbdoc_.sdbdoc.md#subscribe)
* [traverse](_sdbdoc_.sdbdoc.md#traverse)
* [unsubscribe](_sdbdoc_.sdbdoc.md#unsubscribe)
* [relative](_sdbdoc_.sdbdoc.md#relative)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new SDBDoc**(docIdentifier: *[DocIdentifier](../modules/_sdbdoc_.md#docidentifier)*, doc: *`ShareDB.Doc`*, sdb: *[SDB](_sdb_.sdb.md)*): [SDBDoc](_sdbdoc_.sdbdoc.md)

*Overrides [OpSubmittable](_opsubmittable_.opsubmittable.md).[constructor](_opsubmittable_.opsubmittable.md#constructor)*

*Defined in [SDBDoc.ts:13](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L13)*

Constructor. This hould never be called directly. Instead, use `SDBClient.get` or `SDBServer.get`

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| docIdentifier | [DocIdentifier](../modules/_sdbdoc_.md#docidentifier) |  A two-item array identifying the document |
| doc | `ShareDB.Doc` |  The ShareDB doc being wrapped |
| sdb | [SDB](_sdb_.sdb.md) |  The parent SDB object |

**Returns:** [SDBDoc](_sdbdoc_.sdbdoc.md)

___

## Methods

<a id="create"></a>

###  create

▸ **create**(data: *`E`*, type?: *`any`*, options?: *`any`*): `Promise`<`this`>

*Defined in [SDBDoc.ts:105](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L105)*

Create this document

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `E` |  The initial set of data |
| `Optional` type | `any` |  (OT type) Defaults to 'ot-json0'. |
| `Optional` options | `any` |  Passed on to ShareDB create |

**Returns:** `Promise`<`this`>

___
<a id="createifempty"></a>

###  createIfEmpty

▸ **createIfEmpty**(data: *`E`*, type?: *`any`*, options?: *`any`*): `Promise`<`this`>

*Defined in [SDBDoc.ts:204](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L204)*

Create this document only if it's empty. If it's not empty, do nothing.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `E` |  The initial data |
| `Optional` type | `any` |  The OT type |
| `Optional` options | `any` |  Any other options passed into ShareDB |

**Returns:** `Promise`<`this`>

___
<a id="del"></a>

###  del

▸ **del**(source?: *`any`*): `Promise`<`void`>

*Defined in [SDBDoc.ts:116](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L116)*

Delete the document locally and send changes to the ShareDB server

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` source | `any` | true |  (optional) passed locally |

**Returns:** `Promise`<`void`>

___
<a id="destroy"></a>

###  destroy

▸ **destroy**(): `void`

*Defined in [SDBDoc.ts:215](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L215)*

When done with the document, do cleanup. This does _not_ delete the doc.

**Returns:** `void`

___
<a id="dosubmitop"></a>

### `<Protected>` doSubmitOp

▸ **doSubmitOp**(ops: *`ReadonlyArray`<`ShareDB.Op`>*, source?: *`any`*): `Promise`<`this`>

*Overrides [OpSubmittable](_opsubmittable_.opsubmittable.md).[doSubmitOp](_opsubmittable_.opsubmittable.md#dosubmitop)*

*Defined in [SDBDoc.ts:187](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L187)*

Submit a raw series of ShareDB operations

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| ops | `ReadonlyArray`<`ShareDB.Op`> | - |  The raw operations |
| `Default value` source | `any` | true |  (optional) the change source |

**Returns:** `Promise`<`this`>

___
<a id="fetch"></a>

###  fetch

▸ **fetch**(): `Promise`<`ShareDB.Doc`>

*Defined in [SDBDoc.ts:88](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L88)*

Fetch and get the actual ShareDB doc.

**Returns:** `Promise`<`ShareDB.Doc`>
a promise wrapping the ShareDB doc

___
<a id="getdata"></a>

###  getData

▸ **getData**(): `E`

*Defined in [SDBDoc.ts:48](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L48)*

Get the data in this document

**Returns:** `E`

___
<a id="getidentifier"></a>

###  getIdentifier

▸ **getIdentifier**(): [DocIdentifier](../modules/_sdbdoc_.md#docidentifier)

*Defined in [SDBDoc.ts:43](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L43)*

The identifier for this document

**Returns:** [DocIdentifier](../modules/_sdbdoc_.md#docidentifier)
a two-item array representing the identifier

___
<a id="subdoc"></a>

###  subDoc

▸ **subDoc**T(path: *`ShareDB.Path`*): [SDBSubDoc](_sdbsubdoc_.sdbsubdoc.md)<`T`>

*Defined in [SDBDoc.ts:35](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L35)*

Create a SubDoc of this document (a document to represent one particular item within it).

```
// suppose doc has {a: 1, b: { x: { val: "abc" }}}
const sd = doc.subDoc<{val: string}>(['b', 'x]);
sd.subscribe(() => { console.log(sd.getData()); // {val: "abc"}});
```

**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `ShareDB.Path` |  The path of the subdoc |

**Returns:** [SDBSubDoc](_sdbsubdoc_.sdbsubdoc.md)<`T`>

___
<a id="submitlistdeleteop"></a>

###  submitListDeleteOp

▸ **submitListDeleteOp**(p: *`ShareDB.Path`*, ld?: *`any`*): `Promise`<`this`>

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitListDeleteOp](_opsubmittable_.opsubmittable.md#submitlistdeleteop)*

*Defined in [OpSubmittable.ts:96](https://github.com/soney/sdb-ts/blob/2988743/src/OpSubmittable.ts#L96)*

Remove an item from a list

```
doc.submitListDeleteOp(['lst', 2]);
```

is analogous to

```
obj.lst.splice(2, 1);
```

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| p | `ShareDB.Path` | - |  The path array |
| `Default value` ld | `any` | this.traverse(p) |  The object to delete. Leave this unspecified. |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitlistinsertop"></a>

###  submitListInsertOp

▸ **submitListInsertOp**(p: *`ShareDB.Path`*, li: *`any`*): `Promise`<`this`>

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitListInsertOp](_opsubmittable_.opsubmittable.md#submitlistinsertop)*

*Defined in [OpSubmittable.ts:81](https://github.com/soney/sdb-ts/blob/2988743/src/OpSubmittable.ts#L81)*

Insert an item into a list

```
doc.submitListInsert(['lst', 0], 'item');
```

is analogous to

```
obj.lst[0] = 'item';
```

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | `ShareDB.Path` |  The path array |
| li | `any` |  The object to insert. |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitlistpushop"></a>

###  submitListPushOp

▸ **submitListPushOp**(p: *`ShareDB.Path`*, ...items: *`Array`<`any`>*): `Promise`<`this`>

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitListPushOp](_opsubmittable_.opsubmittable.md#submitlistpushop)*

*Defined in [OpSubmittable.ts:146](https://github.com/soney/sdb-ts/blob/2988743/src/OpSubmittable.ts#L146)*

Push any number of items to the end of the list.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | `ShareDB.Path` |  The path array |
| `Rest` items | `Array`<`any`> |  The items to add to the end of the list |

**Returns:** `Promise`<`this`>

___
<a id="submitlistreplaceop"></a>

###  submitListReplaceOp

▸ **submitListReplaceOp**(p: *`ShareDB.Path`*, li: *`any`*, ld?: *`any`*): `Promise`<`this`>

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitListReplaceOp](_opsubmittable_.opsubmittable.md#submitlistreplaceop)*

*Defined in [OpSubmittable.ts:66](https://github.com/soney/sdb-ts/blob/2988743/src/OpSubmittable.ts#L66)*

Replace an item in a list

```
doc.submitListReplaceOp(['lst', 0], 'item');
```

is analogous to

```
obj.lst[0] = 'item';
```

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| p | `ShareDB.Path` | - |  The path array |
| li | `any` | - |  The object to insert. |
| `Default value` ld | `any` | this.traverse(p) |  The object to remove. Leave this unspecified. |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitlistspliceop"></a>

###  submitListSpliceOp

▸ **submitListSpliceOp**(p: *`ShareDB.Path`*, index: *`number`*, numToRemove: *`number`*, ...toAdd: *`Array`<`any`>*): `Promise`<`this`>

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitListSpliceOp](_opsubmittable_.opsubmittable.md#submitlistspliceop)*

*Defined in [OpSubmittable.ts:122](https://github.com/soney/sdb-ts/blob/2988743/src/OpSubmittable.ts#L122)*

Perform a JavaScript splice operation

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | `ShareDB.Path` |  The path array |
| index | `number` |  Index at which to start changing the array (with origin 0). |
| numToRemove | `number` |  An integer indicating the number of old array elements to remove. |
| `Rest` toAdd | `Array`<`any`> |  The elements to add to the array, beginning at \`index\`. |

**Returns:** `Promise`<`this`>

___
<a id="submitlistunshiftop"></a>

###  submitListUnshiftOp

▸ **submitListUnshiftOp**(p: *`ShareDB.Path`*, ...items: *`Array`<`any`>*): `Promise`<`this`>

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitListUnshiftOp](_opsubmittable_.opsubmittable.md#submitlistunshiftop)*

*Defined in [OpSubmittable.ts:159](https://github.com/soney/sdb-ts/blob/2988743/src/OpSubmittable.ts#L159)*

Add any number of items to the beginning of a list

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | `ShareDB.Path` |  The path array |
| `Rest` items | `Array`<`any`> |  The items to add to the beginning of the list |

**Returns:** `Promise`<`this`>

___
<a id="submitnumberaddop"></a>

###  submitNumberAddOp

▸ **submitNumberAddOp**(p: *`ShareDB.Path`*, na: *`number`*): `Promise`<`this`>

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitNumberAddOp](_opsubmittable_.opsubmittable.md#submitnumberaddop)*

*Defined in [OpSubmittable.ts:112](https://github.com/soney/sdb-ts/blob/2988743/src/OpSubmittable.ts#L112)*

Increment a number

```
doc.submitNumberAddOp(['prop1', 'x'], 4);
```

is analogous to

```
obj.prop1.x += 4;
```

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | `ShareDB.Path` |  The path array |
| na | `number` |  The number to increment by |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitobjectdeleteop"></a>

###  submitObjectDeleteOp

▸ **submitObjectDeleteOp**(p: *`ShareDB.Path`*, od?: *`any`*): `Promise`<`this`>

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitObjectDeleteOp](_opsubmittable_.opsubmittable.md#submitobjectdeleteop)*

*Defined in [OpSubmittable.ts:50](https://github.com/soney/sdb-ts/blob/2988743/src/OpSubmittable.ts#L50)*

Delete an object property.

```
doc.submitObjectDeleteOp(['prop1', 'x']);
```

is analogous to

```
delete obj.prop1.x;
```

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| p | `ShareDB.Path` | - |  The path array |
| `Default value` od | `any` | this.traverse(p) |  (optional) The object to delete. Leave this unspecified. |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitobjectinsertop"></a>

###  submitObjectInsertOp

▸ **submitObjectInsertOp**(p: *`ShareDB.Path`*, oi: *`any`*): `Promise`<`this`>

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitObjectInsertOp](_opsubmittable_.opsubmittable.md#submitobjectinsertop)*

*Defined in [OpSubmittable.ts:35](https://github.com/soney/sdb-ts/blob/2988743/src/OpSubmittable.ts#L35)*

Insert within an object (if the property does not have a value).

```
doc.submitObjectInsertOp(['prop1', 'x'], 'value');
```

is analogous to

```
obj.prop1.x = 'value';
```

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | `ShareDB.Path` |  The path array |
| oi | `any` |  The object to insert |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitobjectreplaceop"></a>

###  submitObjectReplaceOp

▸ **submitObjectReplaceOp**(p: *`ShareDB.Path`*, oi: *`any`*, od?: *`any`*): `Promise`<`this`>

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitObjectReplaceOp](_opsubmittable_.opsubmittable.md#submitobjectreplaceop)*

*Defined in [OpSubmittable.ts:20](https://github.com/soney/sdb-ts/blob/2988743/src/OpSubmittable.ts#L20)*

Replace within an object (if the property already has a value).

```
doc.submitObjectReplaceOp(['prop1', 'x'], 'value');
```

is analogous to

```
obj.prop1.x = 'value';
```

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| p | `ShareDB.Path` | - |  The path array |
| oi | `any` | - |  The object to insert |
| `Default value` od | `any` | this.traverse(p) |  (optional) The object to remove. Leave this unspecified |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitop"></a>

###  submitOp

▸ **submitOp**(ops: *`ReadonlyArray`<`ShareDB.Op`>*, source?: *`any`*): `Promise`<`this`>

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitOp](_opsubmittable_.opsubmittable.md#submitop)*

*Defined in [OpSubmittable.ts:169](https://github.com/soney/sdb-ts/blob/2988743/src/OpSubmittable.ts#L169)*

Submit a series of ShareDB operations

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ops | `ReadonlyArray`<`ShareDB.Op`> |  The raw operations |
| `Optional` source | `any` |  (optional) the change source |

**Returns:** `Promise`<`this`>

___
<a id="subscribe"></a>

###  subscribe

▸ **subscribe**(subscriber?: *[Subscriber](../modules/_sdbdoc_.md#subscriber)<`E`>*): `Promise`<`void`>

*Defined in [SDBDoc.ts:145](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L145)*

Signal that we want to listen to changes in this document. Note that we don't fetch new versions unless the document is being subscribed to

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` subscriber | [Subscriber](../modules/_sdbdoc_.md#subscriber)<`E`> |  ()&#x3D;&gt;null |  A callback function that accepts three parameters:*   \`type\`: \`null\` if we are fetching the initial version, `'create'` if the document was created, or `'op'` if an operation happened*   \`ops\`: The raw ShareDB operations (\`null\` if \`type\` is not `'op'`)*   \`source\`: The local source if passed in (\`null\` otherwise)*   \`data\`: The current document snapshot |

**Returns:** `Promise`<`void`>
a promise that resolves when we have an initial snapshot of the document

___
<a id="traverse"></a>

###  traverse

▸ **traverse**(path: *`ReadonlyArray`< `string` &#124; `number`>*): `any`

*Overrides [OpSubmittable](_opsubmittable_.opsubmittable.md).[traverse](_opsubmittable_.opsubmittable.md#traverse)*

*Defined in [SDBDoc.ts:58](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L58)*

Get the value at a given location in the document.

```
// suppose doc has {a: 1, b: { x: { val: "abc" }}}
console.log(doc.traverse(['b', 'x', 'val'])); // prints 'abc'
```

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `ReadonlyArray`< `string` &#124; `number`> |  The path array |

**Returns:** `any`

___
<a id="unsubscribe"></a>

###  unsubscribe

▸ **unsubscribe**(subscriber: *[Subscriber](../modules/_sdbdoc_.md#subscriber)<`E`>*): `void`

*Defined in [SDBDoc.ts:171](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L171)*

Stop listening in a subscription (the opposite of `.subscribe()`)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| subscriber | [Subscriber](../modules/_sdbdoc_.md#subscriber)<`E`> |  The subscribe function to remove |

**Returns:** `void`

___
<a id="relative"></a>

### `<Static>` relative

▸ **relative**(from: *`ShareDB.Path`*, to: *`ShareDB.Path`*): `ShareDB.Path`

*Defined in [SDBDoc.ts:78](https://github.com/soney/sdb-ts/blob/2988743/src/SDBDoc.ts#L78)*

Get the relative path from `from` to `to`.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| from | `ShareDB.Path` |  The path that we are reading relative to |
| to | `ShareDB.Path` |  The full path |

**Returns:** `ShareDB.Path`
A path that takes us from `from` to `to`

___

