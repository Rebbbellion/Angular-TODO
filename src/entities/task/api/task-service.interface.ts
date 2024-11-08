import { Observable } from 'rxjs';
import { TaskAPI, TaskId } from 'shared/api';
import { ChangeMethodArgs } from 'shared/lib';
import { Task, TaskStatus } from '../model/task.model';

export interface TaskAPIService {
  getTasks(): Observable<Task[]>;
  createTask(task: TaskAPI, taskStatus: TaskStatus): Observable<Task>;
  editTask(
    task: TaskAPI,
    apiId: TaskId,
    taskStatus: TaskStatus
  ): Observable<Task>;
  deleteTask(apiId: TaskId): Observable<void>;
}

export interface OfflineService extends TaskAPIService {
  markAsDeleted(
    apiId: TaskId,
    taskStatus: TaskStatus.Deleted
  ): Observable<void>;
}

type MethodsArgsToChange = {
  createTask: [task: TaskAPI];
  deleteTask: [apiId: TaskId, taskStatus: TaskStatus];
};

export interface TaskDataService
  extends ChangeMethodArgs<TaskAPIService, MethodsArgsToChange> {}
