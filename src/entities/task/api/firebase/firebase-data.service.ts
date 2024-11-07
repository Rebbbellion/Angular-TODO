import { inject, Injectable } from '@angular/core';
import { first, map, Observable, tap } from 'rxjs';
import {
  FirebaseApiService,
  TaskAPI,
  TaskCollectionResponse,
  TaskCreationResponse,
  TaskId,
} from 'shared/api';
import { IndexedDBService } from '../indexedDB';
import { TaskService } from '../task-service.interface';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService implements TaskService {
  private readonly data: FirebaseApiService = inject(FirebaseApiService);
  private readonly indexedDB: IndexedDBService = inject(IndexedDBService);

  public getTasks(): Observable<Task[]> {
    return this.data.getTasks().pipe(
      map((tasks: TaskCollectionResponse | null) =>
        tasks
          ? Object.keys(tasks).map((taskId: TaskId) => ({
              ...tasks[taskId as keyof TaskCollectionResponse],
              apiId: taskId,
            }))
          : []
      ),
      tap((tasks: Task[]) => {
        tasks.forEach((task: Task) => {
          this.indexedDB.createTask(task).subscribe({ error: () => {} });
        });
      }),
      first()
    );
  }

  public editTask(task: TaskAPI, apiId: TaskId): Observable<Task> {
    return this.data.editTask(task, apiId).pipe(
      map(() => ({ ...task, apiId })),
      tap(() => {
        this.indexedDB.editTask(task, apiId).subscribe();
      }),
      first()
    );
  }

  public createTask(task: TaskAPI): Observable<Task> {
    return this.data.createTask(task).pipe(
      map((response: TaskCreationResponse) => ({
        ...task,
        apiId: response.name,
      })),
      tap((taskRes: Task) => {
        this.indexedDB.createTask(taskRes);
      }),
      first()
    );
  }

  public deleteTask(apiId: TaskId): Observable<void> {
    return this.data.deleteTask(apiId).pipe(
      tap(() => this.indexedDB.deleteTask(apiId)),
      first()
    );
  }
}
