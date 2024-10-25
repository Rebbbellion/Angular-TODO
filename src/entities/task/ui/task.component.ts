import { Component, inject, Input } from '@angular/core';
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
}
