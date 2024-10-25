import { ConfigContainer } from 'shared/lib';

export type ButtonConfig = {
  title: string;
  svgId: string;
};

export const enum ButtonConfigKey {
  Create = 'createBtn',
  Edit = 'editBtn',
}

export const BUTTON_CONFIGS: ConfigContainer<ButtonConfig> = {
  [ButtonConfigKey.Create]: {
    title: 'Create',
    svgId: 'plus',
  },
  [ButtonConfigKey.Edit]: {
    title: 'Edit',
    svgId: 'edit',
  },
};
