import { Injectable } from '@angular/core';
import { first, map, Observable, Subscriber } from 'rxjs';
import { TaskAPI, TaskId } from 'shared/api';
import { Task, TaskStatus } from '../../model/task.model';
import { OfflineService } from '../task-service.interface';
import { idbObservableFactory } from './idb-observable.factory';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService implements OfflineService {
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

  createTask(task: TaskAPI, taskStatus: TaskStatus): Observable<Task> {
    return idbObservableFactory<TaskId>(this.initDB(), {
      storeName: 'tasks',
      mode: 'readwrite',
      action: (store: IDBObjectStore) => store.add({ ...task, taskStatus }),
    }).pipe(
      map((apiId: TaskId) => ({ ...task, apiId, taskStatus })),
      first()
    );
  }

  editTask(
    task: TaskAPI,
    apiId: TaskId,
    taskStatus: TaskStatus
  ): Observable<Task> {
    return idbObservableFactory<TaskId>(this.initDB(), {
      storeName: 'tasks',
      mode: 'readwrite',
      action: (store: IDBObjectStore) =>
        store.put({ ...task, apiId, taskStatus }),
    }).pipe(
      map((apiId: TaskId) => ({ ...task, apiId, taskStatus })),
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

  markAsDeleted(
    apiId: TaskId,
    taskStatus: TaskStatus = TaskStatus.Deleted
  ): Observable<void> {
    return idbObservableFactory(this.initDB(), {
      storeName: 'tasks',
      mode: 'readwrite',
      action: (store: IDBObjectStore) => store.put({ apiId, taskStatus }),
    }).pipe(
      map(() => {}),
      first()
    );
  }
}
