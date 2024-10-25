import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/lib';
import { CheckboxComponent } from './checkbox';
import { HeaderComponent } from './header';
import { PopupComponent } from './popup';

@NgModule({
  declarations: [HeaderComponent, CheckboxComponent, PopupComponent],
  imports: [SharedModule],
  exports: [HeaderComponent, CheckboxComponent, PopupComponent],
})
export class UiModule {}
