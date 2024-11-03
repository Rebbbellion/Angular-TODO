import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TaskAPI,
  TaskCollectionResponse,
  TaskCreationResponse,
} from './firebase-data.models';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService {
  private readonly http: HttpClient = inject(HttpClient);

  public getTasks(): Observable<TaskCollectionResponse | null> {
    return this.http.get<TaskCollectionResponse>('tasks');
  }

  public editTask(
    task: Partial<TaskAPI>,
    taskId: string
  ): Observable<Partial<TaskAPI>> {
    return this.http.patch<Partial<TaskAPI>>('tasks/' + taskId, task);
  }

  public createTask(task: TaskAPI): Observable<TaskCreationResponse> {
    return this.http.post<TaskCreationResponse>('tasks', task);
  }

  public deleteTask(taskId: string): Observable<null> {
    return this.http.delete<null>('tasks/' + taskId);
  }
}
