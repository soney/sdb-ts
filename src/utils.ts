export function isArrayEqual(a: any[], b: any[]) {
    if ( a.length === b.length ) {
        for(let i: number = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
}

export function extend(obj: {[key: string]: any}, ...args: {[key: string]: any}[]): {[key: string]: any} {
    args.forEach((arg: {[key: string]: any}) => {
        if(arg) {
            for (let prop in arg) {
                obj[prop] = arg;
            }
        }
    });
    return obj;
}