import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormConfig } from './form.configs';
import { FormValues } from './form.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input() public formValues: FormValues = {
    title: '',
    desc: '',
    completed: false,
    apiId: '',
  };

  @Input() public formConfig!: FormConfig;

  @Output('formClose')
  public readonly formCloseEvent: EventEmitter<void> = new EventEmitter<void>();

  @Output('formSubmit')
  public readonly formSubmitEvent: EventEmitter<FormValues> =
    new EventEmitter<FormValues>();

  public onSubmit(form: NgForm) {
    this.formSubmitEvent.emit({ ...this.formValues });
    form.resetForm();
    this.formCloseEvent.emit();
  }
}
