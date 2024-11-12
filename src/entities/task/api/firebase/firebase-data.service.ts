import { Injectable, inject } from '@angular/core';
import { Task, TaskStatus } from 'entities/task/model';
import { Observable, first, map } from 'rxjs';
import {
  FirebaseApiService,
  TaskAPI,
  TaskCollectionResponse,
  TaskCreationResponse,
  TaskId,
} from 'shared/api';
import { IndexedDBService } from '../indexedDB';
import { TaskAPIService } from '../task-service.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService implements TaskAPIService {
  private readonly data: FirebaseApiService = inject(FirebaseApiService);
  private readonly indexedDB: IndexedDBService = inject(IndexedDBService);

  public getTasks(): Observable<Task[]> {
    return this.data.getTasks().pipe(
      map((tasks: TaskCollectionResponse | null) =>
        tasks
          ? Object.keys(tasks).map((taskId: TaskId) => ({
              ...tasks[taskId as keyof TaskCollectionResponse],
              apiId: taskId,
              taskStatus: TaskStatus.Sync,
            }))
          : []
      ),
      first()
    );
  }

  public editTask(
    task: TaskAPI,
    apiId: TaskId,
    taskStatus: TaskStatus.Sync
  ): Observable<Task> {
    return this.data.editTask(task, apiId).pipe(
      map(() => ({ ...task, apiId, taskStatus })),
      first()
    );
  }

  public createTask(
    task: TaskAPI,
    taskStatus: TaskStatus.Sync
  ): Observable<Task> {
    return this.data.createTask(task).pipe(
      map((response: TaskCreationResponse) => ({
        ...task,
        apiId: response.name,
        taskStatus,
      })),
      first()
    );
  }

  public deleteTask(apiId: TaskId): Observable<void> {
    return this.data.deleteTask(apiId).pipe(first());
  }
}
