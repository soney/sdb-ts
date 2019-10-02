[sdb-ts](../README.md) › [Globals](../globals.md) › ["utils"](_utils_.md)

# External module: "utils"

## Index

### Classes

* [ReconnectingWebsocket](../classes/_utils_.reconnectingwebsocket.md)

### Functions

* [extend](_utils_.md#extend)
* [isArrayEqual](_utils_.md#isarrayequal)

## Functions

###  extend

▸ **extend**(`obj`: object, ...`args`: object[]): *object*

*Defined in [utils.ts:33](https://github.com/soney/sdb-ts/blob/57db8cd/src/utils.ts#L33)*

Assigns own enumerable string keyed properties of source objects to the destination object.
Source objects are applied from left to right.
Subsequent sources overwrite property assignments of previous sources.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | object | The initial object (which will be mutated) |
`...args` | object[] | Any number of objects to extend `obj` by |

**Returns:** *object*

obj

* \[ **key**: *string*\]: any

___

###  isArrayEqual

▸ **isArrayEqual**(`a`: ReadonlyArray‹any›, `b`: ReadonlyArray‹any›): *boolean*

*Defined in [utils.ts:12](https://github.com/soney/sdb-ts/blob/57db8cd/src/utils.ts#L12)*

Performs a shallow item-by-item comparison between two arrays.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`a` | ReadonlyArray‹any› | The first array to compare |
`b` | ReadonlyArray‹any› | The second array to compare  |

**Returns:** *boolean*

True if the two arrays are equal, false otherwise
