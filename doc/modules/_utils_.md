[sdb-ts](../README.md) > ["utils"](../modules/_utils_.md)

# External module: "utils"

## Index

### Functions

* [extend](_utils_.md#extend)
* [isArrayEqual](_utils_.md#isarrayequal)

---

## Functions

<a id="extend"></a>

###  extend

▸ **extend**(obj: *`object`*, ...args: *`object`[]*): `object`

*Defined in [utils.ts:30](https://github.com/soney/sdb-ts/blob/4b5785c/src/utils.ts#L30)*

Assigns own enumerable string keyed properties of source objects to the destination object. Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| obj | `object` |  The initial object (which will be mutated) |
| `Rest` args | `object`[] |  Any number of objects to extend \`obj\` by |

**Returns:** `object`
obj

___
<a id="isarrayequal"></a>

###  isArrayEqual

▸ **isArrayEqual**(a: *`ReadonlyArray`<`any`>*, b: *`ReadonlyArray`<`any`>*): `boolean`

*Defined in [utils.ts:9](https://github.com/soney/sdb-ts/blob/4b5785c/src/utils.ts#L9)*

Performs a shallow item-by-item comparison between two arrays.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| a | `ReadonlyArray`<`any`> |  The first array to compare |
| b | `ReadonlyArray`<`any`> |  The second array to compare |

**Returns:** `boolean`
True if the two arrays are equal, false otherwise

___

