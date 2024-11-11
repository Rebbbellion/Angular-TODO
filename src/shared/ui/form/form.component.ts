import { Component, inject, Input, Type } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormConfig, FormType } from './form.configs';
import { FormValues } from './form.model';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  standalone: false,
})
export class FormComponent<T extends FormType> {
  public formService: FormService<T> = inject(FormService<T>);

  public readonly formComponentType: Type<FormComponent<T>> = FormComponent<T>;

  @Input() public formValues!: FormValues<T>;

  @Input() public formConfig!: FormConfig;

  public onSubmit(form: NgForm) {
    this.formService.formSubmit.next({ ...this.formValues });
    form.resetForm();
    this.formService.formClose();
  }
}
