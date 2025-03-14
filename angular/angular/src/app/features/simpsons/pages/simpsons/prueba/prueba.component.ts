import { CommonModule } from '@angular/common';
import { Directive, Component, Input, OnInit, forwardRef, Provider, Host, Optional, SkipSelf, OnChanges, OnDestroy, SimpleChanges, Inject, Self, Injector, viewChild } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ControlContainer, FormBuilder, FormControlName, FormGroup, NG_ASYNC_VALIDATORS, NG_VALIDATORS, ReactiveFormsModule, Validator, ValidatorFn, Validators } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControl, FormGroupDirective, NgControl } from '@angular/forms';
@Component({
  selector: 'my-input',
  template: `
    <input [value]="value" (input)="onInput($event)" />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {

  @Input() value: any = '';

  myInput = viewChild("myInput")

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(input.value);
  }
}


@Directive({
  selector: '[dynamicFormControl]'
})
export class DynamicFormControlDirective extends FormControlName {

  @Input('dynamicFormControl') override name: string | number | null = null;

  constructor(@Optional() @Host() @SkipSelf() parent: ControlContainer,
  @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[], inputComponent: InputComponent) {
    super(parent, [], [], valueAccessors, null);
    console.log(inputComponent)
  }
  // constructor(injector: Injector) {
    
  // }

}





@Component({
  selector: 'app-prueba',
  imports: [CommonModule, ReactiveFormsModule, InputComponent, DynamicFormControlDirective],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  enviar(event: any) {
    console.log(this.form.value)
    console.log(this.form.valid)
  }
}
