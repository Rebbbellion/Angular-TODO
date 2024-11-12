import { TaskAPI, TaskId } from 'shared/api';
import { ChangeMethodArgs } from 'shared/lib';
import { TaskAPIService } from '../api';
import { TaskStatus } from './task.model';

type MethodsArgsToChange = {
  createTask: [task: TaskAPI];
  deleteTask: [apiId: TaskId, taskStatus: TaskStatus];
};

export interface TaskDataFacade
  extends ChangeMethodArgs<TaskAPIService, MethodsArgsToChange> {}
