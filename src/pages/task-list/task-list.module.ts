import { NgModule } from '@angular/core';
import { TaskModule } from 'entities/task';
import { SharedModule } from 'shared/lib';
import { TaskListComponent } from './ui';

@NgModule({
  declarations: [TaskListComponent],
  imports: [SharedModule, TaskModule],
  exports: [TaskListComponent],
})
export class TaskListModule {}
