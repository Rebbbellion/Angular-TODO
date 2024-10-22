import { inject, Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { FirebaseDataService, TaskCollectionResponse } from 'shared/api';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly data: FirebaseDataService = inject(FirebaseDataService);

  public getTasks(): Observable<Task[]> {
    return this.data.getTasks().pipe(
      map((tasks: TaskCollectionResponse) =>
        Object.keys(tasks).map((taskId: string) => ({
          ...tasks[taskId as keyof TaskCollectionResponse],
          apiId: taskId,
        }))
      ),
      first()
    );
  }
}
