import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/lib';
import { CheckboxComponent } from './checkbox';
import { HeaderComponent } from './header';

@NgModule({
  declarations: [HeaderComponent, CheckboxComponent],
  imports: [SharedModule],
  exports: [HeaderComponent, CheckboxComponent],
})
export class UiModule {}
