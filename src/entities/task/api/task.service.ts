import { inject, Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import {
  FirebaseDataService,
  TaskAPI,
  TaskCollectionResponse,
  TaskCreationResponse,
} from 'shared/api';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly data: FirebaseDataService = inject(FirebaseDataService);

  public getTasks(): Observable<Task[]> {
    return this.data.getTasks().pipe(
      map((tasks: TaskCollectionResponse | null) =>
        tasks
          ? Object.keys(tasks).map((taskId: string) => ({
              ...tasks[taskId as keyof TaskCollectionResponse],
              apiId: taskId,
            }))
          : []
      ),
      first()
    );
  }

  public editTask(task: Task): Observable<Task> {
    const { apiId, ...taskBody } = task;
    return this.data.editTask(taskBody, apiId).pipe(
      map(() => ({ ...task })),
      first()
    );
  }

  public createTask(task: TaskAPI): Observable<Task> {
    return this.data.createTask(task).pipe(
      map((response: TaskCreationResponse) => ({
        ...task,
        apiId: response.name,
      }))
    );
  }
}
