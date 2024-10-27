import { Component, inject } from '@angular/core';
import { TaskService } from 'entities/task';
import { FORM_CONFIGS, FormConfig, FormType } from 'shared/ui';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  public readonly taskService: TaskService = inject(TaskService);
  public readonly formConfig: FormConfig = FORM_CONFIGS[FormType.Create];

  public creationMode: boolean = false;
}
