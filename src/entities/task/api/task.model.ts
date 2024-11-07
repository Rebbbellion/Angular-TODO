import { TaskAPI, TaskId } from 'shared/api';

export type Task = TaskAPI & { apiId: TaskId; taskStatus: TaskStatus };

export const enum TaskStatus {
  New = 'new',
  Modified = 'modified',
  Deleted = 'deleted',
  Sync = 'sync',
}
