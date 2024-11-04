import { Observable } from 'rxjs';
import { TaskAPI } from 'shared/api';
import { Task } from './task.model';

export interface TaskService {
  getTasks(): Observable<Task[]>;
  createTask(task: TaskAPI): Observable<Task>;
  editTask(task: Task): Observable<Task>;
  deleteTask(taskId: string): Observable<null>;
}
