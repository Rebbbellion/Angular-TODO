import { inject, Injectable } from '@angular/core';
import { first, map, Observable, Subject, switchMap } from 'rxjs';
import {
  FirebaseDataService,
  TaskCollectionResponse,
  TaskCreationResponse,
} from 'shared/api';
import { FormValues } from 'shared/ui';
import { Task, TaskEditData } from './task.model';

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

  public editTask(): Observable<TaskEditData> {
    return this.taskEditSubject.pipe(
      switchMap((taskEditData: TaskEditData) => {
        const { apiId, ...taskBody } = taskEditData;
        return this.data
          .editTask(taskBody, apiId)
          .pipe(map(() => ({ ...taskEditData })));
      })
    );
  }
  public readonly taskEditSubject: Subject<TaskEditData> =
    new Subject<TaskEditData>();

  public createTask(): Observable<Task> {
    return this.taskCreateSubject.pipe(
      switchMap((task: FormValues) => {
        const { apiId, ...taskBody } = task;
        return this.data.createTask(taskBody).pipe(
          map((response: TaskCreationResponse) => ({
            ...taskBody,
            apiId: response.name,
          }))
        );
      })
    );
  }
  public readonly taskCreateSubject: Subject<FormValues> =
    new Subject<FormValues>();
}
