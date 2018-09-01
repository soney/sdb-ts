[sdb-ts](../README.md) > ["SDBDoc"](../modules/_sdbdoc_.md)

# External module: "SDBDoc"

## Index

### Classes

* [SDBDoc](../classes/_sdbdoc_.sdbdoc.md)

### Type aliases

* [DocIdentifier](_sdbdoc_.md#docidentifier)
* [Subscriber](_sdbdoc_.md#subscriber)

---

## Type aliases

<a id="docidentifier"></a>

###  DocIdentifier

**Ƭ DocIdentifier**: *[`string`, `string`]*

*Defined in [SDBDoc.ts:7](https://github.com/soney/sdb-ts/blob/1937748/src/SDBDoc.ts#L7)*

___
<a id="subscriber"></a>

###  Subscriber

**Ƭ Subscriber**: *`function`*

*Defined in [SDBDoc.ts:8](https://github.com/soney/sdb-ts/blob/1937748/src/SDBDoc.ts#L8)*

#### Type declaration
▸(eventType: * `string` &#124; `null`*, ops: * `ReadonlyArray`<`ShareDB.Op`> &#124; `null`*, source: *`any`*, data: * `E` &#124; `null`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| eventType |  `string` &#124; `null`|
| ops |  `ReadonlyArray`<`ShareDB.Op`> &#124; `null`|
| source | `any` |
| data |  `E` &#124; `null`|

**Returns:** `void`

___

