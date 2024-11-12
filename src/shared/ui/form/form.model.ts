import { TaskAPI } from 'shared/api';
import { FormType } from './form.configs';

export type FormValues<T extends FormType = FormType.Edit> =
  T extends FormType.Create
    ? Omit<TaskAPI, 'completed'> & { completed: false }
    : TaskAPI;
