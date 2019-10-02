[sdb-ts](../README.md) › [Globals](../globals.md) › ["OpSubmittable"](../modules/_opsubmittable_.md) › [OpSubmittable](_opsubmittable_.opsubmittable.md)

# Class: OpSubmittable

## Hierarchy

* **OpSubmittable**

  ↳ [SDBSubDoc](_sdbsubdoc_.sdbsubdoc.md)

  ↳ [SDBDoc](_sdbdoc_.sdbdoc.md)

## Index

### Constructors

* [constructor](_opsubmittable_.opsubmittable.md#constructor)

### Methods

* [doSubmitOp](_opsubmittable_.opsubmittable.md#protected-abstract-dosubmitop)
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
* [traverse](_opsubmittable_.opsubmittable.md#abstract-traverse)

## Constructors

###  constructor

\+ **new OpSubmittable**(): *[OpSubmittable](_opsubmittable_.opsubmittable.md)*

*Defined in [OpSubmittable.ts:3](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L3)*

**Returns:** *[OpSubmittable](_opsubmittable_.opsubmittable.md)*

## Methods

### `Protected` `Abstract` doSubmitOp

▸ **doSubmitOp**(`ops`: ReadonlyArray‹ShareDB.Op›, `source?`: any): *Promise‹this›*

*Defined in [OpSubmittable.ts:178](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L178)*

Submit a raw series of ShareDB operations

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ops` | ReadonlyArray‹ShareDB.Op› | The raw operations |
`source?` | any | (optional) the change source  |

**Returns:** *Promise‹this›*

___

###  submitListDeleteOp

▸ **submitListDeleteOp**(`p`: ShareDB.Path, `ld`: any): *Promise‹this›*

*Defined in [OpSubmittable.ts:96](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L96)*

Remove an item from a list
```
doc.submitListDeleteOp(['lst', 2]);
```
is analogous to

```
obj.lst.splice(2, 1);
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`p` | ShareDB.Path | - | The path array |
`ld` | any | this.traverse(p) | The object to delete. Leave this unspecified. |

**Returns:** *Promise‹this›*

A promise that resolve to `this`

___

###  submitListInsertOp

▸ **submitListInsertOp**(`p`: ShareDB.Path, `li`: any): *Promise‹this›*

*Defined in [OpSubmittable.ts:81](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L81)*

Insert an item into a list
```
doc.submitListInsert(['lst', 0], 'item');
```
is analogous to

```
obj.lst[0] = 'item';
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`p` | ShareDB.Path | The path array |
`li` | any | The object to insert. |

**Returns:** *Promise‹this›*

A promise that resolve to `this`

___

###  submitListPushOp

▸ **submitListPushOp**(`p`: ShareDB.Path, ...`items`: Array‹any›): *Promise‹this›*

*Defined in [OpSubmittable.ts:146](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L146)*

Push any number of items to the end of the list.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`p` | ShareDB.Path | The path array |
`...items` | Array‹any› | The items to add to the end of the list  |

**Returns:** *Promise‹this›*

___

###  submitListReplaceOp

▸ **submitListReplaceOp**(`p`: ShareDB.Path, `li`: any, `ld`: any): *Promise‹this›*

*Defined in [OpSubmittable.ts:66](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L66)*

Replace an item in a list
```
doc.submitListReplaceOp(['lst', 0], 'item');
```
is analogous to

```
obj.lst[0] = 'item';
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`p` | ShareDB.Path | - | The path array |
`li` | any | - | The object to insert. |
`ld` | any | this.traverse(p) | The object to remove. Leave this unspecified. |

**Returns:** *Promise‹this›*

A promise that resolve to `this`

___

###  submitListSpliceOp

▸ **submitListSpliceOp**(`p`: ShareDB.Path, `index`: number, `numToRemove`: number, ...`toAdd`: Array‹any›): *Promise‹this›*

*Defined in [OpSubmittable.ts:122](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L122)*

Perform a JavaScript splice operation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`p` | ShareDB.Path | The path array |
`index` | number | Index at which to start changing the array (with origin 0). |
`numToRemove` | number | An integer indicating the number of old array elements to remove. |
`...toAdd` | Array‹any› | The elements to add to the array, beginning at `index`.  |

**Returns:** *Promise‹this›*

___

###  submitListUnshiftOp

▸ **submitListUnshiftOp**(`p`: ShareDB.Path, ...`items`: Array‹any›): *Promise‹this›*

*Defined in [OpSubmittable.ts:159](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L159)*

Add any number of items to the beginning of a list

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`p` | ShareDB.Path | The path array |
`...items` | Array‹any› | The items to add to the beginning of the list  |

**Returns:** *Promise‹this›*

___

###  submitNumberAddOp

▸ **submitNumberAddOp**(`p`: ShareDB.Path, `na`: number): *Promise‹this›*

*Defined in [OpSubmittable.ts:112](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L112)*

Increment a number
```
doc.submitNumberAddOp(['prop1', 'x'], 4);
```
is analogous to

```
obj.prop1.x += 4;
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`p` | ShareDB.Path | The path array |
`na` | number | The number to increment by |

**Returns:** *Promise‹this›*

A promise that resolve to `this`

___

###  submitObjectDeleteOp

▸ **submitObjectDeleteOp**(`p`: ShareDB.Path, `od`: any): *Promise‹this›*

*Defined in [OpSubmittable.ts:50](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L50)*

Delete an object property.
```
doc.submitObjectDeleteOp(['prop1', 'x']);
```
is analogous to

```
delete obj.prop1.x;
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`p` | ShareDB.Path | - | The path array |
`od` | any | this.traverse(p) | (optional) The object to delete. Leave this unspecified. |

**Returns:** *Promise‹this›*

A promise that resolve to `this`

___

###  submitObjectInsertOp

▸ **submitObjectInsertOp**(`p`: ShareDB.Path, `oi`: any): *Promise‹this›*

*Defined in [OpSubmittable.ts:35](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L35)*

Insert within an object (if the property does not have a value).
```
doc.submitObjectInsertOp(['prop1', 'x'], 'value');
```
is analogous to

```
obj.prop1.x = 'value';
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`p` | ShareDB.Path | The path array |
`oi` | any | The object to insert |

**Returns:** *Promise‹this›*

A promise that resolve to `this`

___

###  submitObjectReplaceOp

▸ **submitObjectReplaceOp**(`p`: ShareDB.Path, `oi`: any, `od`: any): *Promise‹this›*

*Defined in [OpSubmittable.ts:20](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L20)*

Replace within an object (if the property already has a value).
```
doc.submitObjectReplaceOp(['prop1', 'x'], 'value');
```
is analogous to

```
obj.prop1.x = 'value';
```

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`p` | ShareDB.Path | - | The path array |
`oi` | any | - | The object to insert |
`od` | any | this.traverse(p) | (optional) The object to remove. Leave this unspecified |

**Returns:** *Promise‹this›*

A promise that resolve to `this`

___

###  submitOp

▸ **submitOp**(`ops`: ReadonlyArray‹ShareDB.Op›, `source?`: any): *Promise‹this›*

*Defined in [OpSubmittable.ts:169](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L169)*

Submit a series of ShareDB operations

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ops` | ReadonlyArray‹ShareDB.Op› | The raw operations |
`source?` | any | (optional) the change source  |

**Returns:** *Promise‹this›*

___

### `Abstract` traverse

▸ **traverse**(`path`: ShareDB.Path): *any*

*Defined in [OpSubmittable.ts:184](https://github.com/soney/sdb-ts/blob/57db8cd/src/OpSubmittable.ts#L184)*

Get the value at a given location in the document.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`path` | ShareDB.Path | The path array  |

**Returns:** *any*
