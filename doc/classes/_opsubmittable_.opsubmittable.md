[sdb-ts](../README.md) > ["OpSubmittable"](../modules/_opsubmittable_.md) > [OpSubmittable](../classes/_opsubmittable_.opsubmittable.md)

# Class: OpSubmittable

## Hierarchy

**OpSubmittable**

↳  [SDBSubDoc](_sdbsubdoc_.sdbsubdoc.md)

↳  [SDBDoc](_sdbdoc_.sdbdoc.md)

## Index

### Constructors

* [constructor](_opsubmittable_.opsubmittable.md#constructor)

### Methods

* [submitListDeleteOp](_opsubmittable_.opsubmittable.md#submitlistdeleteop)
* [submitListInsertOp](_opsubmittable_.opsubmittable.md#submitlistinsertop)
* [submitListPushOp](_opsubmittable_.opsubmittable.md#submitlistpushop)
* [submitListReplaceOp](_opsubmittable_.opsubmittable.md#submitlistreplaceop)
* [submitListSpliceOp](_opsubmittable_.opsubmittable.md#submitlistspliceop)
* [submitListUnshiftOp](_opsubmittable_.opsubmittable.md#submitlistunshiftop)
* [submitNumberAddOp](_opsubmittable_.opsubmittable.md#submitnumberaddop)
* [submitObjectDeleteOp](_opsubmittable_.opsubmittable.md#submitobjectdeleteop)
* [submitObjectInsertOp](_opsubmittable_.opsubmittable.md#submitobjectinsertop)
* [submitObjectReplaceOp](_opsubmittable_.opsubmittable.md#submitobjectreplaceop)
* [submitOp](_opsubmittable_.opsubmittable.md#submitop)
* [traverse](_opsubmittable_.opsubmittable.md#traverse)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new OpSubmittable**(): [OpSubmittable](_opsubmittable_.opsubmittable.md)

*Defined in [OpSubmittable.ts:3](https://github.com/soney/sdb-ts/blob/4b5785c/src/OpSubmittable.ts#L3)*

**Returns:** [OpSubmittable](_opsubmittable_.opsubmittable.md)

___

## Methods

<a id="submitlistdeleteop"></a>

###  submitListDeleteOp

▸ **submitListDeleteOp**(p: *`Array`< `string` &#124; `number`>*, ld?: *`any`*): `Promise`<`this`>

*Defined in [OpSubmittable.ts:96](https://github.com/soney/sdb-ts/blob/4b5785c/src/OpSubmittable.ts#L96)*

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
| p | `Array`< `string` &#124; `number`> | - |  The path array |
| `Default value` ld | `any` | this.traverse(p) |  The object to delete. Leave this unspecified. |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitlistinsertop"></a>

###  submitListInsertOp

▸ **submitListInsertOp**(p: *`Array`< `string` &#124; `number`>*, li: *`any`*): `Promise`<`this`>

*Defined in [OpSubmittable.ts:81](https://github.com/soney/sdb-ts/blob/4b5785c/src/OpSubmittable.ts#L81)*

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
| p | `Array`< `string` &#124; `number`> |  The path array |
| li | `any` |  The object to insert. |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitlistpushop"></a>

###  submitListPushOp

▸ **submitListPushOp**(p: *`Array`< `string` &#124; `number`>*, ...items: *`Array`<`any`>*): `Promise`<`this`>

*Defined in [OpSubmittable.ts:146](https://github.com/soney/sdb-ts/blob/4b5785c/src/OpSubmittable.ts#L146)*

Push any number of items to the end of the list.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | `Array`< `string` &#124; `number`> |  The path array |
| `Rest` items | `Array`<`any`> |  The items to add to the end of the list |

**Returns:** `Promise`<`this`>

___
<a id="submitlistreplaceop"></a>

###  submitListReplaceOp

▸ **submitListReplaceOp**(p: *`Array`< `string` &#124; `number`>*, li: *`any`*, ld?: *`any`*): `Promise`<`this`>

*Defined in [OpSubmittable.ts:66](https://github.com/soney/sdb-ts/blob/4b5785c/src/OpSubmittable.ts#L66)*

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
| p | `Array`< `string` &#124; `number`> | - |  The path array |
| li | `any` | - |  The object to insert. |
| `Default value` ld | `any` | this.traverse(p) |  The object to remove. Leave this unspecified. |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitlistspliceop"></a>

###  submitListSpliceOp

▸ **submitListSpliceOp**(p: *`Array`< `string` &#124; `number`>*, index: *`number`*, numToRemove: *`number`*, ...toAdd: *`Array`<`any`>*): `Promise`<`this`>

*Defined in [OpSubmittable.ts:122](https://github.com/soney/sdb-ts/blob/4b5785c/src/OpSubmittable.ts#L122)*

Perform a JavaScript splice operation

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | `Array`< `string` &#124; `number`> |  The path array |
| index | `number` |  Index at which to start changing the array (with origin 0). |
| numToRemove | `number` |  An integer indicating the number of old array elements to remove. |
| `Rest` toAdd | `Array`<`any`> |  The elements to add to the array, beginning at \`index\`. |

**Returns:** `Promise`<`this`>

___
<a id="submitlistunshiftop"></a>

###  submitListUnshiftOp

▸ **submitListUnshiftOp**(p: *`Array`< `string` &#124; `number`>*, ...items: *`Array`<`any`>*): `Promise`<`this`>

*Defined in [OpSubmittable.ts:162](https://github.com/soney/sdb-ts/blob/4b5785c/src/OpSubmittable.ts#L162)*

Add any number of items to the beginning of a list

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | `Array`< `string` &#124; `number`> |  The path array |
| `Rest` items | `Array`<`any`> |  The items to add to the beginning of the list |

**Returns:** `Promise`<`this`>

___
<a id="submitnumberaddop"></a>

###  submitNumberAddOp

▸ **submitNumberAddOp**(p: *`Array`< `string` &#124; `number`>*, na: *`number`*): `Promise`<`this`>

*Defined in [OpSubmittable.ts:112](https://github.com/soney/sdb-ts/blob/4b5785c/src/OpSubmittable.ts#L112)*

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
| p | `Array`< `string` &#124; `number`> |  The path array |
| na | `number` |  The number to increment by |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitobjectdeleteop"></a>

###  submitObjectDeleteOp

▸ **submitObjectDeleteOp**(p: *`Array`< `string` &#124; `number`>*, od?: *`any`*): `Promise`<`this`>

*Defined in [OpSubmittable.ts:50](https://github.com/soney/sdb-ts/blob/4b5785c/src/OpSubmittable.ts#L50)*

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
| p | `Array`< `string` &#124; `number`> | - |  The path array |
| `Default value` od | `any` | this.traverse(p) |  (optional) The object to delete. Leave this unspecified. |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitobjectinsertop"></a>

###  submitObjectInsertOp

▸ **submitObjectInsertOp**(p: *`Array`< `string` &#124; `number`>*, oi: *`any`*): `Promise`<`this`>

*Defined in [OpSubmittable.ts:35](https://github.com/soney/sdb-ts/blob/4b5785c/src/OpSubmittable.ts#L35)*

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
| p | `Array`< `string` &#124; `number`> |  The path array |
| oi | `any` |  The object to insert |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitobjectreplaceop"></a>

###  submitObjectReplaceOp

▸ **submitObjectReplaceOp**(p: *`Array`< `string` &#124; `number`>*, oi: *`any`*, od?: *`any`*): `Promise`<`this`>

*Defined in [OpSubmittable.ts:20](https://github.com/soney/sdb-ts/blob/4b5785c/src/OpSubmittable.ts#L20)*

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
| p | `Array`< `string` &#124; `number`> | - |  The path array |
| oi | `any` | - |  The object to insert |
| `Default value` od | `any` | this.traverse(p) |  (optional) The object to remove. Leave this unspecified |

**Returns:** `Promise`<`this`>
A promise that resolve to `this`

___
<a id="submitop"></a>

### `<Abstract>` submitOp

▸ **submitOp**(ops: *`Array`<`ShareDB.Op`>*, source?: *`any`*): `Promise`<`this`>

*Defined in [OpSubmittable.ts:177](https://github.com/soney/sdb-ts/blob/4b5785c/src/OpSubmittable.ts#L177)*

Submit a raw series of ShareDB operations

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ops | `Array`<`ShareDB.Op`> |  The raw operations |
| `Optional` source | `any` |  (optional) the change source |

**Returns:** `Promise`<`this`>

___
<a id="traverse"></a>

### `<Abstract>` traverse

▸ **traverse**(path: *`Array`< `string` &#124; `number`>*): `any`

*Defined in [OpSubmittable.ts:183](https://github.com/soney/sdb-ts/blob/4b5785c/src/OpSubmittable.ts#L183)*

Get the value at a given location in the document.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| path | `Array`< `string` &#124; `number`> |  The path array |

**Returns:** `any`

___

