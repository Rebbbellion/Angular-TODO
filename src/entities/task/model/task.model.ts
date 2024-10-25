import { TaskAPI } from 'shared/api';

export type Task = TaskAPI & { apiId: string };

export type TaskEditData = Partial<Task> & Pick<Task, 'apiId'>;
