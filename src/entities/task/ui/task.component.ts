import { Component, Input } from '@angular/core';
import { Task } from '../model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  host: {
    '[class.completed]': 'task.completed',
  },
})
export class TaskComponent {
  @Input() task!: Task;
}