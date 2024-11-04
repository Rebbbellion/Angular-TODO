import { Component, inject, Input, OnInit } from '@angular/core';
import { FIREBASE_SERVICE_TOKEN, Task, TaskService } from 'entities/task';
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
  private readonly taskService: TaskService = inject(FIREBASE_SERVICE_TOKEN);

  @Input() public task!: Task;

  ngOnInit(): void {
    this.formService.formSubmit
      .pipe(
        takeUntil(this.destroySubject),
        switchMap((formValues: FormValues<FormType.Edit>) =>
          this.taskService.editTask(formValues)
        )
      )
      .subscribe((taskRes: Task) => {
        this.editTask(taskRes);
      });
  }

  public setFormValues() {
    this.formValues = { ...this.task };
  }

  private editTask(taskRes: Task): void {
    for (const key in taskRes) {
      const taskKey = key as keyof Task;
      if (taskRes[taskKey] !== undefined) {
        (this.task[taskKey] as Task[keyof Task]) = taskRes[taskKey];
      }
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
}
