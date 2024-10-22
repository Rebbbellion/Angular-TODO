import { TaskAPI } from 'shared/api';

export type Task = TaskAPI & { apiId: string };
