import { Observable, Subscriber, switchMap } from 'rxjs';

export function idbObservableFactory<T>(
  db: Observable<IDBDatabase>,
  config: IDBActionConfig
): Observable<T> {
  return db.pipe(
    switchMap((db: IDBDatabase) => {
      return new Observable<T>((subscriber: Subscriber<T>) => {
        const transaction: IDBTransaction = db.transaction(
          config.storeName,
          config.mode
        );
        const store: IDBObjectStore = transaction.objectStore(config.storeName);
        const request: IDBRequest<T> = config.action(store);

        request.onsuccess = () => {
          subscriber.next(request.result);
          subscriber.complete();
        };

        request.onerror = () => {
          subscriber.error(request.error);
        };
      });
    })
  );
}

export type IDBActionConfig = {
  storeName: string;
  mode: IDBTransactionMode;
  action: (store: IDBObjectStore) => IDBRequest;
};
