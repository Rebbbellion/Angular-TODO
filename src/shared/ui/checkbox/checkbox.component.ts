import { Component, Input } from '@angular/core';
import { CheckboxInputs } from './checkbox-inputs.model';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  @Input() checkboxInputs!: CheckboxInputs;
}
