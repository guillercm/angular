import { CommonModule } from '@angular/common';
import { Component, computed, forwardRef, input, output, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PatoFormField } from '../pato-form/interfaces/pato-form-field.interface';

@Component({
  selector: 'pato-textarea',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pato-textarea.component.html',
  styleUrl: './pato-textarea.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PatoTextareaComponent),
      multi: true
    }
  ]
})
export class PatoTextareaComponent implements ControlValueAccessor {

  protected readonly formField = input.required<PatoFormField>();

  private _value = signal<string>("");
  protected readonly value = this._value.asReadonly();

  private _disabled = signal<boolean>(false);
  protected readonly disabled = this._disabled.asReadonly();

  public rows = input<number>(3);

  public changeValue = output<string>();

  public control = computed<AbstractControl<any>>(() => this.formField().control() )

  public id = computed<string>(() => this.formField().id())



  onBlur() {
    this._onTouched();
  }

  change(event: Event): void {
    const textareaValue = (event.target as HTMLTextAreaElement).value;
    this._onChange(textareaValue);
  }

  _onChange: (_: any) => void = () => {};
  _onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  writeValue(value: string | null): void {
    this._value.set(value || '');
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }
}
