import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/lib';
import { HeaderComponent } from './header';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule],
  exports: [HeaderComponent],
})
export class UiModule {}
