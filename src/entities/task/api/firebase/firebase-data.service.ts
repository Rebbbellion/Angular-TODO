import { inject, Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import {
  FirebaseApiService,
  TaskAPI,
  TaskCollectionResponse,
  TaskCreationResponse,
  TaskId,
} from 'shared/api';
import { TaskService } from '../task-service.interface';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService implements TaskService {
  private readonly data: FirebaseApiService = inject(FirebaseApiService);

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
      first()
    );
  }

  public editTask(task: TaskAPI, apiId: TaskId): Observable<Task> {
    return this.data.editTask(task, apiId).pipe(
      map(() => ({ ...task, apiId })),
      first()
    );
  }

  public createTask(task: TaskAPI): Observable<Task> {
    return this.data.createTask(task).pipe(
      map((response: TaskCreationResponse) => ({
        ...task,
        apiId: response.name,
      })),
      first()
    );
  }

  public deleteTask(apiId: TaskId): Observable<void> {
    return this.data.deleteTask(apiId).pipe(first());
  }
}
