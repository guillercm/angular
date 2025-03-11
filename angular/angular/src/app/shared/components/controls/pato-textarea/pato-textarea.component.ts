import { CommonModule } from '@angular/common';
import { Component, computed, forwardRef, input, output, signal } from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
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
export class PatoTextareaComponent {

  protected readonly formField = input.required<PatoFormField>();

  private _value = signal<string>("");
  protected readonly value = this._value.asReadonly();

  private _disabled = signal<boolean>(false);
  protected readonly disabled = this._disabled.asReadonly();

  public rows = input<number>(3);

  public changeValue = output<string>();

  public control = computed<AbstractControl<any>>(() => this.formField().control() )

  public id = computed<string>(() => this.formField().id())

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  onBlur() {
    this.onTouched();
  }

  change(event: Event): void {
    const textareaValue = (event.target as HTMLTextAreaElement).value;
    this.onChange(textareaValue);
  }

  writeValue(value: string | null): void {
    if (!value) value = ''
    this._value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }
}
