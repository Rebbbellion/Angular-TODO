import { Component, inject, OnInit } from '@angular/core';
import { Task, TaskService } from 'entities/task';

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
    this.data.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.numberOfCreatedTasks = tasks.length;
        this.showLoader = false;
      },
      error: () => {
        this.tasks = [
          { title: 'Offline', desc: '', completed: false, apiId: 'offline' },
        ];
        this.numberOfCreatedTasks = this.tasks.length;
        this.showLoader = false;
      },
    });
    this.data.createTask().subscribe((task: Task) => {
      this.createTask(task);
    });
  }
  getNumberOfCompletedTasks(): number {
    return this.tasks.filter(({ completed }) => completed).length;
  }

  createTask(task: Task): void {
    this.tasks.push(task);
  }
}
