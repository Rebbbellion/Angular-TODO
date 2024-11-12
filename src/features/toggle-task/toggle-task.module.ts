import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/lib';
import { UiModule } from '../../shared/ui/ui.module';
import { ToggleTaskComponent } from './ui';

@NgModule({
  declarations: [ToggleTaskComponent],
  imports: [SharedModule, UiModule],
  exports: [ToggleTaskComponent],
})
export class ToggleTaskModule {}
