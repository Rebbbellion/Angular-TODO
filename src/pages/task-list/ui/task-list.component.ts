import { Component, inject, OnInit } from '@angular/core';
import { Task, TaskEditData, TaskService } from 'entities/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  private readonly data: TaskService = inject(TaskService);

  public tasks: Task[] = [];
  public numberOfCreatedTasks: number = 0;
  public showLoader: boolean = true;

  ngOnInit(): void {
    this.data.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.numberOfCreatedTasks = tasks.length;
      this.showLoader = false;
    });
    this.data.editTask().subscribe((taskEditData: TaskEditData) => {
      this.editTask(taskEditData);
    });
    this.data.createTask().subscribe((task: Task) => {
      this.createTask(task);
    });
  }
  getNumberOfCompletedTasks(): number {
    return this.tasks.filter(({ completed }) => completed).length;
  }

  editTask(taskEditData: TaskEditData): void {
    const taskIndex = this.tasks.findIndex(
      ({ apiId }) => apiId === taskEditData.apiId
    );

    if (taskIndex === -1) {
      return;
    }

    const taskToEdit = this.tasks[taskIndex];

    for (const key in taskEditData) {
      const taskKey = key as keyof Task;
      if (taskEditData[taskKey] !== undefined) {
        (taskToEdit[taskKey] as Task[keyof Task]) = taskEditData[taskKey];
      }
    }
  }

  createTask(task: Task): void {
    this.tasks.push(task);
  }
}
