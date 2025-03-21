import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, forwardRef, inject, input, signal } from '@angular/core';
import { PatoFormComponent } from '../pato-form/pato-form.component';
import { PatoFormField } from '../pato-form/interfaces/pato-form-field.interface';
import { PatoInputComponent } from '../pato-input/pato-input.component';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';

@Component({
  selector: 'pato-input-number',
  templateUrl: './pato-input-number.component.html',
  styleUrl: './pato-input-number.component.css',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PatoInputComponent),
      multi: true
    }
  ]
})
export class PatoInputNumberComponent {
  private readonly _patoFormComponent = inject(PatoFormComponent);

  private readonly _destroyRef = inject(DestroyRef);

  protected readonly formField = input.required<PatoFormField>();

  public placeholder = input<string>('');

  public icon = input<string>();

  public autocomplete = input<boolean>(true);

  public additionalClasses = input<string>();

  public showArrows = input<boolean>(false);

  public allowNegative = input<boolean>(false);

  public allowDecimal = input<boolean>(false);

  public allowNotation = input<boolean>(false);

  public min = input<number | null>(null);

  public max = input<number | null>(null);

  public control = computed<AbstractControl<any>>(() => this.formField().control() )

  public id = computed<string>(() => this.formField().id())

  private _value = signal<number>(0);
  protected readonly value = this._value.asReadonly();

  private _disabled = signal<boolean>(false);
  protected readonly disabled = this._disabled.asReadonly();

  protected readonly type = "number";
  

  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {

  }

  keyPress( value: string ) {
    this.onChange(Number(value));
  }

  onBlur() {
    this.onTouched();
  }

  writeValue(value: number): void {
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
