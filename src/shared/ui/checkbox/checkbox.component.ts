import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckboxInputs } from './checkbox-inputs.model';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  standalone: false,
})
export class CheckboxComponent {
  @Input() checkboxInputs!: CheckboxInputs;

  @Output('onCheck') public readonly checkboxInputEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
}
