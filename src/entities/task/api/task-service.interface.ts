import { Observable } from 'rxjs';
import { TaskAPI, TaskId } from 'shared/api';
import { Task, TaskStatus } from './task.model';

export interface TaskService {
  getTasks(): Observable<Task[]>;
  createTask(task: TaskAPI, taskStatus?: TaskStatus): Observable<Task>;
  editTask(
    task: TaskAPI,
    apiId: TaskId,
    taskStatus?: TaskStatus
  ): Observable<Task>;
  deleteTask(apiId: TaskId): Observable<void>;
}

export interface OfflineService extends TaskService {
  markAsDeleted(
    apiId: TaskId,
    taskStatus: TaskStatus.Deleted
  ): Observable<void>;
}
