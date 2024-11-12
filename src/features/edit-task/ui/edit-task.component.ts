import { Component, inject, Input, OnInit } from '@angular/core';
import { Task, TaskDataFacade, TaskDataFacadeService } from 'entities/task';
import { Subject, switchMap, takeUntil } from 'rxjs';
import {
  FORM_CONFIGS,
  FormComponent,
  FormConfig,
  FormType,
  FormValues,
} from 'shared/ui';
import { FormService } from 'shared/ui/form/form.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
  providers: [FormService],
})
export class EditTaskComponent
  extends FormComponent<FormType.Edit>
  implements OnInit
{
  public override formConfig: FormConfig = FORM_CONFIGS[FormType.Edit];

  private readonly destroySubject: Subject<void> = new Subject<void>();
  private readonly taskService: TaskDataFacade = inject(TaskDataFacadeService);

  @Input() public task!: Task;

  ngOnInit(): void {
    this.formService.formSubmit
      .pipe(
        takeUntil(this.destroySubject),
        switchMap((formValues: FormValues<FormType.Edit>) =>
          this.taskService.editTask(
            formValues,
            this.task.apiId,
            this.task.taskStatus
          )
        )
      )
      .subscribe((task: Task) => {
        this.editTask(task);
      });
  }

  public setFormValues() {
    const { apiId, ...taskBody } = this.task;
    this.formValues = taskBody;
  }

  private editTask(task: Task): void {
    for (const key in task) {
      const taskKey = key as keyof Task;
      if (task[taskKey] !== undefined) {
        (this.task[taskKey] as Task[keyof Task]) = task[taskKey];
      }
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
}
