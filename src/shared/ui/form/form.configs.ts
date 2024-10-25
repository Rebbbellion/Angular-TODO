import { ConfigContainer } from 'shared/lib';
import { BUTTON_CONFIGS, ButtonConfig, ButtonConfigKey } from '../button';
import { FormValues } from './form.model';

export const enum FormType {
  Create = 'create',
  Edit = 'edit',
}

export type FormConfig = {
  title: string;
  formType: FormType;
  buttonConfig: ButtonConfig;
};

export type formCreationConfig = {
  formConfig: FormConfig;
  formValues: FormValues;
};

export const FORM_CONFIGS: ConfigContainer<FormConfig> = {
  [FormType.Create]: {
    title: 'Create Task',
    formType: FormType.Create,
    buttonConfig: BUTTON_CONFIGS[ButtonConfigKey.Create],
  },
  [FormType.Edit]: {
    title: 'Edit Task',
    formType: FormType.Edit,
    buttonConfig: BUTTON_CONFIGS[ButtonConfigKey.Edit],
  },
};
