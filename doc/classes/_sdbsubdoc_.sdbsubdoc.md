[sdb-ts](../README.md) › [Globals](../globals.md) › ["SDBSubDoc"](../modules/_sdbsubdoc_.md) › [SDBSubDoc](_sdbsubdoc_.sdbsubdoc.md)

# Class: SDBSubDoc <**E**>

## Type parameters

▪ **E**

## Hierarchy

* [OpSubmittable](_opsubmittable_.opsubmittable.md)

  ↳ **SDBSubDoc**

## Index

### Constructors

* [constructor](_sdbsubdoc_.sdbsubdoc.md#constructor)

### Methods

* [doSubmitOp](_sdbsubdoc_.sdbsubdoc.md#protected-dosubmitop)
* [getData](_sdbsubdoc_.sdbsubdoc.md#getdata)
* [submitListDeleteOp](_sdbsubdoc_.sdbsubdoc.md#submitlistdeleteop)
* [submitListInsertOp](_sdbsubdoc_.sdbsubdoc.md#submitlistinsertop)
* [submitListPushOp](_sdbsubdoc_.sdbsubdoc.md#submitlistpushop)
* [submitListReplaceOp](_sdbsubdoc_.sdbsubdoc.md#submitlistreplaceop)
* [submitListSpliceOp](_sdbsubdoc_.sdbsubdoc.md#submitlistspliceop)
* [submitListUnshiftOp](_sdbsubdoc_.sdbsubdoc.md#submitlistunshiftop)
* [submitNumberAddOp](_sdbsubdoc_.sdbsubdoc.md#submitnumberaddop)
* [submitObjectDeleteOp](_sdbsubdoc_.sdbsubdoc.md#submitobjectdeleteop)
* [submitObjectInsertOp](_sdbsubdoc_.sdbsubdoc.md#submitobjectinsertop)
* [submitObjectReplaceOp](_sdbsubdoc_.sdbsubdoc.md#submitobjectreplaceop)
* [submitOp](_sdbsubdoc_.sdbsubdoc.md#submitop)
* [subscribe](_sdbsubdoc_.sdbsubdoc.md#subscribe)
* [traverse](_sdbsubdoc_.sdbsubdoc.md#traverse)
* [unsubscribe](_sdbsubdoc_.sdbsubdoc.md#unsubscribe)

## Constructors

###  constructor

\+ **new SDBSubDoc**(`doc`: [SDBDoc](_sdbdoc_.sdbdoc.md)‹any›, `path`: ShareDB.Path): *[SDBSubDoc](_sdbsubdoc_.sdbsubdoc.md)*

*Overrides [OpSubmittable](_opsubmittable_.opsubmittable.md).[constructor](_opsubmittable_.opsubmittable.md#constructor)*

*Defined in [SDBSubDoc.ts:7](https://github.com/soney/sdb-ts/blob/2d09328/src/SDBSubDoc.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`doc` | [SDBDoc](_sdbdoc_.sdbdoc.md)‹any› |
`path` | ShareDB.Path |

**Returns:** *[SDBSubDoc](_sdbsubdoc_.sdbsubdoc.md)*

## Methods

### `Protected` doSubmitOp

▸ **doSubmitOp**(`ops`: ReadonlyArray‹ShareDB.Op›, `source`: any): *Promise‹this›*

*Overrides [OpSubmittable](_opsubmittable_.opsubmittable.md).[doSubmitOp](_opsubmittable_.opsubmittable.md#protected-abstract-dosubmitop)*

*Defined in [SDBSubDoc.ts:78](https://github.com/soney/sdb-ts/blob/2d09328/src/SDBSubDoc.ts#L78)*

Submit a raw series of ShareDB operations. Note that all paths should be relative to this subdoc

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`ops` | ReadonlyArray‹ShareDB.Op› | - | The raw operations |
`source` | any | true | (optional) the change source  |

**Returns:** *Promise‹this›*

___

###  getData

▸ **getData**(): *E | null*

*Defined in [SDBSubDoc.ts:65](https://github.com/soney/sdb-ts/blob/2d09328/src/SDBSubDoc.ts#L65)*

Get the data in this sub-document

**Returns:** *E | null*

___

###  submitListDeleteOp

▸ **submitListDeleteOp**(`p`: ShareDB.Path, `ld`: any): *Promise‹this›*

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitListDeleteOp](_opsubmittable_.opsubmittable.md#submitlistdeleteop)*

*Defined in [OpSubmittable.ts:96](https://github.com/soney/sdb-ts/blob/2d09328/src/OpSubmittable.ts#L96)*

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

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitListInsertOp](_opsubmittable_.opsubmittable.md#submitlistinsertop)*

*Defined in [OpSubmittable.ts:81](https://github.com/soney/sdb-ts/blob/2d09328/src/OpSubmittable.ts#L81)*

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

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitListPushOp](_opsubmittable_.opsubmittable.md#submitlistpushop)*

*Defined in [OpSubmittable.ts:146](https://github.com/soney/sdb-ts/blob/2d09328/src/OpSubmittable.ts#L146)*

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

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitListReplaceOp](_opsubmittable_.opsubmittable.md#submitlistreplaceop)*

*Defined in [OpSubmittable.ts:66](https://github.com/soney/sdb-ts/blob/2d09328/src/OpSubmittable.ts#L66)*

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

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitListSpliceOp](_opsubmittable_.opsubmittable.md#submitlistspliceop)*

*Defined in [OpSubmittable.ts:122](https://github.com/soney/sdb-ts/blob/2d09328/src/OpSubmittable.ts#L122)*

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

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitListUnshiftOp](_opsubmittable_.opsubmittable.md#submitlistunshiftop)*

*Defined in [OpSubmittable.ts:159](https://github.com/soney/sdb-ts/blob/2d09328/src/OpSubmittable.ts#L159)*

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

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitNumberAddOp](_opsubmittable_.opsubmittable.md#submitnumberaddop)*

*Defined in [OpSubmittable.ts:112](https://github.com/soney/sdb-ts/blob/2d09328/src/OpSubmittable.ts#L112)*

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

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitObjectDeleteOp](_opsubmittable_.opsubmittable.md#submitobjectdeleteop)*

*Defined in [OpSubmittable.ts:50](https://github.com/soney/sdb-ts/blob/2d09328/src/OpSubmittable.ts#L50)*

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

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitObjectInsertOp](_opsubmittable_.opsubmittable.md#submitobjectinsertop)*

*Defined in [OpSubmittable.ts:35](https://github.com/soney/sdb-ts/blob/2d09328/src/OpSubmittable.ts#L35)*

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

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitObjectReplaceOp](_opsubmittable_.opsubmittable.md#submitobjectreplaceop)*

*Defined in [OpSubmittable.ts:20](https://github.com/soney/sdb-ts/blob/2d09328/src/OpSubmittable.ts#L20)*

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

*Inherited from [OpSubmittable](_opsubmittable_.opsubmittable.md).[submitOp](_opsubmittable_.opsubmittable.md#submitop)*

*Defined in [OpSubmittable.ts:169](https://github.com/soney/sdb-ts/blob/2d09328/src/OpSubmittable.ts#L169)*

Submit a series of ShareDB operations

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ops` | ReadonlyArray‹ShareDB.Op› | The raw operations |
`source?` | any | (optional) the change source  |

**Returns:** *Promise‹this›*

___

###  subscribe

▸ **subscribe**(`callback`: [Subscriber](../modules/_sdbdoc_.md#subscriber)‹E›): *Promise‹void›*

*Defined in [SDBSubDoc.ts:22](https://github.com/soney/sdb-ts/blob/2d09328/src/SDBSubDoc.ts#L22)*

Signal that we want to listen to changes in this sub-document. Note that we don't fetch new versions unless the document is being
subscribed to

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`callback` | [Subscriber](../modules/_sdbdoc_.md#subscriber)‹E› |  ()=>null |

**Returns:** *Promise‹void›*

a promise that resolves when we have an initial snapshot of the sub-document

___

###  traverse

▸ **traverse**(`path`: ShareDB.Path): *any*

*Overrides [OpSubmittable](_opsubmittable_.opsubmittable.md).[traverse](_opsubmittable_.opsubmittable.md#abstract-traverse)*

*Defined in [SDBSubDoc.ts:87](https://github.com/soney/sdb-ts/blob/2d09328/src/SDBSubDoc.ts#L87)*

Get the value at a given location in the document. Note that this is relative to this subdocument

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`path` | ShareDB.Path | The path array  |

**Returns:** *any*

___

###  unsubscribe

▸ **unsubscribe**(`callback`: [Subscriber](../modules/_sdbdoc_.md#subscriber)‹E›): *void*

*Defined in [SDBSubDoc.ts:55](https://github.com/soney/sdb-ts/blob/2d09328/src/SDBSubDoc.ts#L55)*

Unsubscribe from changes to this document

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`callback` | [Subscriber](../modules/_sdbdoc_.md#subscriber)‹E› | The callback to unsubscribe  |

**Returns:** *void*
