import { Component, inject, Input } from '@angular/core';
import { FirebaseDataService, Task, TaskService } from 'entities/task';
import { debounce } from 'shared/lib';

@Component({
  selector: 'app-toggle-task',
  templateUrl: './toggle-task.component.html',
  styleUrl: './toggle-task.component.scss',
})
export class ToggleTaskComponent {
  @Input() task!: Task;

  private readonly taskService: TaskService = inject(FirebaseDataService);

  @debounce(500)
  public toggleTask(): void {
    const { apiId, ...task } = this.task;
    this.taskService.editTask(task, apiId).subscribe();
  }
}
