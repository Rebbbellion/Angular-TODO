import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormType } from './form.configs';
import { FormValues } from './form.model';

@Injectable({
  providedIn: 'root',
})
export class FormService<T extends FormType> {
  public showForm: boolean = false;

  public formOpen() {
    this.showForm = true;
  }

  public formClose() {
    this.showForm = false;
  }

  public readonly formSubmit: Subject<FormValues<T>> = new Subject<
    FormValues<T>
  >();
}
