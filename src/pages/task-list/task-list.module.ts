import { NgModule } from '@angular/core';
import { TaskModule } from 'entities/task';
import { CreateTaskModule } from 'features/create-task';
import { SharedModule } from 'shared/lib';
import { TaskListComponent } from './ui';

@NgModule({
  declarations: [TaskListComponent],
  imports: [SharedModule, TaskModule, CreateTaskModule],
  exports: [TaskListComponent],
})
export class TaskListModule {}
