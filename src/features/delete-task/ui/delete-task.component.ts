import { Component, inject, Input } from '@angular/core';
import { Task, TaskDataFacade, TaskDataFacadeService } from 'entities/task';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss',
  standalone: false,
})
export class DeleteTaskComponent {
  private readonly taskService: TaskDataFacade = inject(TaskDataFacadeService);

  @Input() tasks!: Task[];
  @Input() task!: Task;

  public showPopup: boolean = false;

  public deleteTask() {
    this.taskService
      .deleteTask(this.task.apiId, this.task.taskStatus)
      .subscribe(() => {
        const taskIndex: number = this.tasks.findIndex(
          (taskInArr: Task) => taskInArr === this.task
        );
        this.tasks.splice(taskIndex, 1);
      });
  }
}
