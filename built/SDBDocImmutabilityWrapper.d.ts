import { SDBDoc } from './SDBDoc';
import { SDBSubDoc } from './SDBSubDoc';
export declare class ImmutabilityWrapper<E> {
    private doc;
    private data;
    private subscriptionFn;
    private isSubscribed;
    constructor(doc: SDBDoc<E> | SDBSubDoc<E>);
    getData(): E | null;
    resubscribe(): Promise<void>;
    unsubscribe(): void;
    private subscribeToDoc;
    private static getUpdatedData;
    private static getOpType;
    private static deepClone;
}
