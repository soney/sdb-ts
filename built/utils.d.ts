/**
 * Performs a shallow item-by-item comparison between two arrays.
 *
 * @param a The first array to compare
 * @param b The second array to compare
 *
 * @returns True if the two arrays are equal, false otherwise
 */
export declare function isArrayEqual(a: ReadonlyArray<any>, b: ReadonlyArray<any>): boolean;
/**
 * Assigns own enumerable string keyed properties of source objects to the destination object.
 * Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * @param obj The initial object (which will be mutated)
 * @param args Any number of objects to extend `obj` by
 * @returns obj
 */
export declare function extend(obj: {
    [key: string]: any;
}, ...args: {
    [key: string]: any;
}[]): {
    [key: string]: any;
};
