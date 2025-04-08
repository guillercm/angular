import { Component, input, viewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { GrcmFormField } from '../form/interfaces/form-field.interface';

@Component({
  selector: 'shared-plain-form-field',
  imports: [],
  templateUrl: './plain-form-field.component.html',
  styleUrl: './plain-form-field.component.css'
})
export class PlainFormFieldComponent implements GrcmFormField {
  public control = input.required<AbstractControl<any>>();

  public id = input.required<string>();

  public controlView = viewChild.required('controlView', { read: ViewContainerRef })

}
