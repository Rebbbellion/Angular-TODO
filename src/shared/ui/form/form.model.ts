import { FormType } from './form.configs';

export type FormValues<T extends FormType = FormType.Edit> =
  T extends FormType.Create
    ? {
        title: string;
        desc: string;
        completed: false;
      }
    : {
        title: string;
        desc: string;
        completed: boolean;
        apiId: string;
      };
