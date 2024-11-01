import { Component, inject, Input } from '@angular/core';
import { Task, TaskService } from 'entities/task';
import { debounce } from 'shared/lib';

@Component({
  selector: 'app-toggle-task',
  templateUrl: './toggle-task.component.html',
  styleUrl: './toggle-task.component.scss',
})
export class ToggleTaskComponent {
  @Input() task!: Task;

  private readonly taskService: TaskService = inject(TaskService);

  @debounce(500)
  public toggleTask(): void {
    this.taskService.editTask(this.task).subscribe();
  }
}
