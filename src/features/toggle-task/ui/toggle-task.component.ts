import { Component, inject, Input } from '@angular/core';
import { Task, TaskDataFacade, TaskDataFacadeService } from 'entities/task';
import { debounce } from 'shared/lib';

@Component({
  selector: 'app-toggle-task',
  templateUrl: './toggle-task.component.html',
  styleUrl: './toggle-task.component.scss',
  standalone: false,
})
export class ToggleTaskComponent {
  @Input() task!: Task;

  private readonly taskService: TaskDataFacade = inject(TaskDataFacadeService);

  @debounce(500)
  public toggleTask(): void {
    const { apiId, taskStatus, ...task } = this.task;
    this.taskService.editTask(task, apiId, taskStatus).subscribe();
  }
}
