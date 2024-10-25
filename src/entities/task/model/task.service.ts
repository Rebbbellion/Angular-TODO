import { inject, Injectable } from '@angular/core';
import { debounceTime, first, map, Observable, Subject, switchMap } from 'rxjs';
import { FirebaseDataService, TaskCollectionResponse } from 'shared/api';
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

  public editTask(): Observable<Partial<Task>> {
    return this.taskEditSubject.pipe(
      debounceTime(500),
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
}
