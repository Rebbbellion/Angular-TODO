import { Component, Input } from '@angular/core';
import { Task } from '../api';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  host: {
    '[class.completed]': 'task.completed',
  },
  standalone: false,
})
export class TaskComponent {
  @Input() public task!: Task;
}
