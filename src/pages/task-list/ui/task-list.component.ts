import { Component, inject, OnInit } from '@angular/core';
import {
  Task,
  TaskDataFacade,
  TaskDataFacadeService,
  TaskStatus,
} from 'entities/task';
import { fadeInOut } from 'shared/lib';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  animations: [fadeInOut],
  standalone: false,
})
export class TaskListComponent implements OnInit {
  private readonly data: TaskDataFacade = inject(TaskDataFacadeService);

  public tasks: Task[] = [];
  public showLoader: boolean = true;

  ngOnInit(): void {
    this.data.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks.filter(
          (task: Task) => task.taskStatus !== TaskStatus.Deleted
        );
        this.showLoader = false;
      },
      error: (err: Error) => {
        this.tasks = [];
        console.log(err.message);
        this.showLoader = false;
      },
    });
  }
  public get numberOfCompletedTasks(): number {
    return this.tasks.filter(({ completed }) => completed).length;
  }
  public get numberOfTasks(): number {
    return this.tasks.length;
  }
}
