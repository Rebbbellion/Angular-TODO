import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateRequest } from 'shared/lib';
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

  @AuthenticateRequest()
  public getTasks(): Observable<TaskCollectionResponse | null> {
    return this.http.get<TaskCollectionResponse>('tasks');
  }

  @AuthenticateRequest()
  public editTask(
    task: Partial<TaskAPI>,
    taskId: string
  ): Observable<Partial<TaskAPI>> {
    return this.http.patch<Partial<TaskAPI>>('tasks/' + taskId, task);
  }

  @AuthenticateRequest()
  public createTask(task: TaskAPI): Observable<TaskCreationResponse> {
    return this.http.post<TaskCreationResponse>('tasks', task);
  }
}
