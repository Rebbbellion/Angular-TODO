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
  public showLoader: boolean = true;

  ngOnInit(): void {
    this.data.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.showLoader = false;
      },
      error: () => {
        this.tasks = [
          { title: 'Offline', desc: '', completed: false, apiId: 'offline' },
        ];
        this.showLoader = false;
      },
    });
  }
  public get numberOfCompletedTasks(): number {
    return this.tasks.filter(({ completed }) => completed).length;
  }
  get numberOfTasks(): number {
    return this.tasks.length;
  }
}
