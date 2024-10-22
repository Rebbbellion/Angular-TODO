import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/lib';
import { UiModule } from 'shared/ui';
import { TaskComponent } from './ui';

@NgModule({
  declarations: [TaskComponent],
  imports: [SharedModule, UiModule],
  exports: [TaskComponent],
})
export class TaskModule {}
