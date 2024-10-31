import { NgModule } from '@angular/core';
import { TaskModule } from 'entities/task';
import { CreateTaskModule } from 'features/create-task';
import { EditTaskModule } from 'features/edit-task';
import { SharedModule } from 'shared/lib';
import { TaskListComponent } from './ui';

@NgModule({
  declarations: [TaskListComponent],
  imports: [SharedModule, TaskModule, CreateTaskModule, EditTaskModule],
  exports: [TaskListComponent],
})
export class TaskListModule {}
