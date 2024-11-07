import { Injectable } from '@angular/core';
import { first, map, Observable, Subscriber } from 'rxjs';
import { TaskAPI, TaskId } from 'shared/api';
import { TaskService } from '../task-service.interface';
import { Task } from '../task.model';
import { idbObservableFactory } from './idb-observable.factory';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService implements TaskService {
  private initDB(): Observable<IDBDatabase> {
    return new Observable((subscriber: Subscriber<IDBDatabase>) => {
      const dbOpenRequest = indexedDB.open('tasks', 1);

      dbOpenRequest.onupgradeneeded = () => {
        const db = dbOpenRequest.result;

        if (!db.objectStoreNames.contains('tasks')) {
          db.createObjectStore('tasks', {
            keyPath: 'apiId',
            autoIncrement: true,
          });
        }
      };

      dbOpenRequest.onsuccess = () => {
        subscriber.next(dbOpenRequest.result);
        subscriber.complete();
      };
      dbOpenRequest.onerror = () => {
        subscriber.error(dbOpenRequest.error);
      };
    });
  }

  getTasks(): Observable<Task[]> {
    return idbObservableFactory<Task[]>(this.initDB(), {
      storeName: 'tasks',
      mode: 'readonly',
      action: (store: IDBObjectStore) => store.getAll(),
    }).pipe(first());
  }

  createTask(task: TaskAPI): Observable<Task> {
    return idbObservableFactory<TaskId>(this.initDB(), {
      storeName: 'tasks',
      mode: 'readwrite',
      action: (store: IDBObjectStore) => store.add(task),
    }).pipe(
      map((apiId: TaskId) => ({ ...task, apiId })),
      first()
    );
  }

  editTask(task: TaskAPI, apiId: TaskId): Observable<Task> {
    return idbObservableFactory<TaskId>(this.initDB(), {
      storeName: 'tasks',
      mode: 'readwrite',
      action: (store: IDBObjectStore) => store.put(task, apiId),
    }).pipe(
      map((apiId: TaskId) => ({ ...task, apiId })),
      first()
    );
  }

  deleteTask(apiId: TaskId): Observable<void> {
    return idbObservableFactory<undefined>(this.initDB(), {
      storeName: 'tasks',
      mode: 'readwrite',
      action: (store) => store.delete(apiId),
    });
  }
}
