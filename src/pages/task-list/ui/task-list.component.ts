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

  ngOnInit(): void {
    this.data.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }
}
