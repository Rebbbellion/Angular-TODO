import { TaskAPI, TaskId } from 'shared/api';

export type Task = TaskAPI & { apiId: TaskId };
