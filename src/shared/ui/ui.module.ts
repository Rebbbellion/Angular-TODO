import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/lib';
import { ButtonComponent } from './button';
import { CheckboxComponent } from './checkbox';
import { HeaderComponent } from './header';
import { PopupComponent } from './popup';

@NgModule({
  declarations: [
    HeaderComponent,
    CheckboxComponent,
    PopupComponent,
    ButtonComponent,
  ],
  imports: [SharedModule],
  exports: [
    HeaderComponent,
    CheckboxComponent,
    PopupComponent,
    ButtonComponent,
  ],
})
export class UiModule {}
