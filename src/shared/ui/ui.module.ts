import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/lib';
import { ButtonComponent } from './button';
import { CheckboxComponent } from './checkbox';
import { FormComponent } from './form';
import { HeaderComponent } from './header';
import { OnlineStateComponent } from './online-state';
import { PopupComponent } from './popup';

@NgModule({
  declarations: [
    HeaderComponent,
    CheckboxComponent,
    PopupComponent,
    ButtonComponent,
    FormComponent,
    OnlineStateComponent,
  ],
  imports: [SharedModule],
  exports: [
    HeaderComponent,
    CheckboxComponent,
    PopupComponent,
    ButtonComponent,
    FormComponent,
    OnlineStateComponent,
  ],
})
export class UiModule {}
