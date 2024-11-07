import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
	FirebaseDataService,
	Task,
	TaskService
} from 'entities/task';
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
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
  providers: [FormService],
})
export class CreateTaskComponent
  extends FormComponent<FormType.Create>
  implements OnInit, OnDestroy
{
  private readonly destroySubject: Subject<void> = new Subject<void>();
  public readonly taskService: TaskService = inject(FirebaseDataService);

  public override formConfig: FormConfig = FORM_CONFIGS[FormType.Create];
  public override formValues: FormValues<FormType.Create> = {
    title: '',
    desc: '',
    completed: false,
  };

  @Input() tasks!: Task[];

  ngOnInit(): void {
    this.formService.formSubmit
      .pipe(
        takeUntil(this.destroySubject),
        switchMap((formValues: FormValues<FormType.Create>) =>
          this.taskService.createTask(formValues)
        )
      )
      .subscribe((task: Task) => {
        this.tasks.push(task);
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
}
