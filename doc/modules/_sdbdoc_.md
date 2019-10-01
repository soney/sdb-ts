[sdb-ts](../README.md) › [Globals](../globals.md) › ["SDBDoc"](_sdbdoc_.md)

# External module: "SDBDoc"

## Index

### Classes

* [SDBDoc](../classes/_sdbdoc_.sdbdoc.md)

### Type aliases

* [DocIdentifier](_sdbdoc_.md#docidentifier)
* [Subscriber](_sdbdoc_.md#subscriber)

## Type aliases

###  DocIdentifier

Ƭ **DocIdentifier**: *[string, string]*

*Defined in [SDBDoc.ts:7](https://github.com/soney/sdb-ts/blob/5c450be/src/SDBDoc.ts#L7)*

___

###  Subscriber

Ƭ **Subscriber**: *function*

*Defined in [SDBDoc.ts:8](https://github.com/soney/sdb-ts/blob/5c450be/src/SDBDoc.ts#L8)*

#### Type declaration:

▸ (`eventType`: string | null, `ops`: ReadonlyArray‹ShareDB.Op› | null, `source`: any, `data`: E | null): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventType` | string &#124; null |
`ops` | ReadonlyArray‹ShareDB.Op› &#124; null |
`source` | any |
`data` | E &#124; null |
