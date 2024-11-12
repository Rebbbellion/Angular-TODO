import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/lib';
import { UiModule } from 'shared/ui';
import { CreateTaskComponent } from './ui';

@NgModule({
  declarations: [CreateTaskComponent],
  imports: [SharedModule, UiModule],
  exports: [CreateTaskComponent],
})
export class CreateTaskModule {}
