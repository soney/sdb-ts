import update from 'immutability-helper';

export class ImmutabilityWrapper<E> {

}
    private subscribers:Subscriber<E>[] = []; // A list of functions that are subscribing to ops and events
        /**
     * Signal that we want to listen to changes in this document. Note that we don't fetch new versions unless the document is being
     * subscribed to
     * 
     * @param subscriber A callback function that accepts three parameters:
     * - `type`: `null` if we are fetching the initial version, `'create'` if the document was created, or `'op'` if an operation happened
     * - `ops`: The raw ShareDB operations (`null` if `type` is not `'op'`)
     * - `source`: The local source if passed in (`null` otherwise)
     * - `data`: The current document snapshot
     * @returns a promise that resolves when we have an initial snapshot of the document
     */
    public subscribe(subscriber: Subscriber<E> = ()=>null): Promise<void> {
        this.subscribers.push(subscriber);

        if(this.subscribers.length === 1) {
            this.doc.addListener('op', this.onOp);
            this.doc.addListener('create', this.onCreate);
            return new Promise<void>((resolve, reject) => {
                this.doc.subscribe((err) => {
                    subscriber(null, null, null, this.doc.data);
                    if(err) {
                        reject(err);
                        throw(err);
                    } else {
                        resolve();
                    }
                });
            });
        } else {
            subscriber(null, null, null, this.doc.data);
            return Promise.resolve();
        }
    };
    /**
     * Stop listening in a subscription (the opposite of `.subscribe()`)
     * @param subscriber The subscribe function to remove
     */
    public unsubscribe(subscriber: Subscriber<E>): void {
        let idx: number;
        while((idx = this.subscribers.indexOf(subscriber))>=0) {
            this.subscribers.splice(idx, 1);
        }
        if(this.subscribers.length === 0) {
            this.doc.removeListener('op', this.onOp);
            this.doc.removeListener('create', this.onCreate);
        }
    }