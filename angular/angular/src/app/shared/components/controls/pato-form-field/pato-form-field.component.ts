import { Component, OnInit, input, effect, viewChild, ViewContainerRef, computed, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { FormFieldComponent } from "../../../../features/simpsons/components/form-field/form-field.component";

let path = './pato-form-field.component.html';

@Component({
  selector: 'pato-form-field',
  imports: [CommonModule, FormFieldComponent],
  templateUrl: path,
  styleUrl: './pato-form-field.component.css'
})
export class PatoFormFieldComponent implements OnInit {


  // public controlView = viewChild.required('controlView', { read: ViewContainerRef })

  // public control = input.required<AbstractControl<any>>();

  // public id = input.required<string>();

  // public data = input.required<any>();
  
   
  ngOnInit(): void {

  }
}
