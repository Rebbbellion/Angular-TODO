import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TaskAPI,
  TaskCollectionResponse,
  TaskCreationResponse,
  TaskId,
} from './firebase-data.models';

@Injectable({
  providedIn: 'root',
})
export class FirebaseApiService {
  private readonly http: HttpClient = inject(HttpClient);

  public getTasks(): Observable<TaskCollectionResponse | null> {
    return this.http.get<TaskCollectionResponse>('tasks');
  }

  public editTask(task: TaskAPI, apiId: TaskId): Observable<TaskAPI> {
    return this.http.patch<TaskAPI>('tasks/' + apiId, task);
  }

  public createTask(task: TaskAPI): Observable<TaskCreationResponse> {
    return this.http.post<TaskCreationResponse>('tasks', task);
  }

  public deleteTask(apiId: TaskId): Observable<void> {
    return this.http.delete<void>('tasks/' + apiId);
  }
}
