import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateRequest } from 'shared/lib';
import { TaskCollectionResponse } from './firebase-data.models';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService {
  private readonly http: HttpClient = inject(HttpClient);

  @AuthenticateRequest()
  public getTasks(): Observable<TaskCollectionResponse> {
    return this.http.get<TaskCollectionResponse>('tasks');
  }
}
