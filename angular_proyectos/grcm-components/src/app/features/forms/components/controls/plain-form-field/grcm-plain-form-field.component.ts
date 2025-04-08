import { Component, input, viewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { GrcmFormField } from '../form/interfaces/form-field.interface';

@Component({
  selector: 'grcm-plain-form-field',
  imports: [],
  templateUrl: './grcm-plain-form-field.component.html',
  styleUrl: './grcm-plain-form-field.component.css'
})
export class GrcmPlainFormFieldComponent implements GrcmFormField {

  public controlView = viewChild.required('controlView', { read: ViewContainerRef })

  public control = input.required<AbstractControl<any>>();

  public id = input.required<string>();

}
