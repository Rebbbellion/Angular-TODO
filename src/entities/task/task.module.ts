import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/lib';
import { TaskComponent } from './ui';

@NgModule({
  declarations: [TaskComponent],
  imports: [SharedModule],
  exports: [TaskComponent],
})
export class TaskModule {}
