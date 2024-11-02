import { Component, Input } from '@angular/core';
import { Task } from 'entities/task';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.scss',
})
export class DeleteTaskComponent {
  @Input() tasks!: Task[];
  @Input() task!: Task;

  public showPopup: boolean = false;
}
