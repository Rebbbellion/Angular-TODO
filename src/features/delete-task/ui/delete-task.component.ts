import { Component, inject, Input } from '@angular/core';
import { Task, TaskService } from 'entities/task';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss',
})
export class DeleteTaskComponent {
  private readonly taskService: TaskService = inject(TaskService);

  @Input() tasks!: Task[];
  @Input() task!: Task;

  public showPopup: boolean = false;

  public deleteTask() {
    this.taskService.deleteTask(this.task.apiId).subscribe(() => {
      const taskIndex: number = this.tasks.findIndex(
        (taskInArr: Task) => taskInArr === this.task
      );
      this.tasks.splice(taskIndex, 1);
    });
  }
}
