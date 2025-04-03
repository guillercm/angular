import { Component, input, viewChild, ViewContainerRef } from '@angular/core';
import { PatoFormField } from '../pato-form/interfaces/pato-form-field.interface';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'shared-plain-form-field',
  imports: [],
  templateUrl: './plain-form-field.component.html',
  styleUrl: './plain-form-field.component.css'
})
export class PlainFormFieldComponent implements PatoFormField {
  public control = input.required<AbstractControl<any>>();

  public id = input.required<string>();

  public controlView = viewChild.required('controlView', { read: ViewContainerRef })

}
