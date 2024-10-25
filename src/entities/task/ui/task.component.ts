import { Component, inject, Input } from '@angular/core';
import { debounce } from 'shared/lib';
import { FORM_CONFIGS, FormType } from 'shared/ui';
import { Task, TaskService } from '../model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  host: {
    '[class.completed]': 'task.completed',
  },
})
export class TaskComponent {
  @Input() public task!: Task;

  public readonly taskService: TaskService = inject(TaskService);

  public readonly formConfig = FORM_CONFIGS[FormType.Edit];

  public taskOnEdit: Task | null = null;

  public setTaskForEdit(): void {
    this.taskOnEdit = { ...this.task };
  }

  @debounce(1000)
  public changeTaskCompletion($event: boolean) {
    this.taskService.taskEditSubject.next({
      completed: $event,
      apiId: this.task.apiId,
    });
  }
}
