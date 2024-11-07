import { Observable } from 'rxjs';
import { TaskAPI, TaskId } from 'shared/api';
import { Task } from './task.model';

export interface TaskService {
  getTasks(): Observable<Task[]>;
  createTask(task: TaskAPI): Observable<Task>;
  editTask(task: TaskAPI, apiId: TaskId): Observable<Task>;
  deleteTask(apiId: TaskId): Observable<null>;
}
