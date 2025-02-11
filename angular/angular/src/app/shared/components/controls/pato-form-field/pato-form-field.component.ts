import { Component, OnInit, input, effect, viewChild, ViewContainerRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'pato-form-field',
  imports: [CommonModule],
  templateUrl: './pato-form-field.component.html',
  styleUrl: './pato-form-field.component.css'
})
export class PatoFormFieldComponent implements OnInit {

  public dynamicContent = viewChild.required('dynamicContent', { read: ViewContainerRef })

  public control = input.required<AbstractControl<any>>();

  public label = input<string>("");

  protected errors = computed( () => { console.log(this.control().errors); return this.control().errors} )

  ngOnInit(): void {

  }
}
