import { Component, computed, DestroyRef, forwardRef, Host, Inject, inject, Injector, input, OnInit, Optional, output, Self, signal, SkipSelf } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroup, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule, Validator, ValidatorFn } from '@angular/forms';
import { PatoFormFieldComponent } from '../pato-form-field/pato-form-field.component';

@Component({
  selector: 'pato-input',
  templateUrl: './pato-input.component.html',
  styles: ``,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PatoInputComponent),
      multi: true
    }
  ]
})
export class PatoInputComponent implements OnInit, ControlValueAccessor {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _formField = inject(PatoFormFieldComponent);

  public control = computed<AbstractControl<any>>(() => this._formField.control() )

  // private readonly _formControlDirective = inject(ControlContainer);

  private _value = signal<string>("");
  public value = this._value.asReadonly();

  private _disabled = signal<boolean>(false);
  public disabled = this._disabled.asReadonly();

  public placeholder = input<string>('');

  public debounceTimer = input<number>(300);

  public onValue = output<string>();

  public onDebounce = output<string>();

  private _debouncer: Subject<string> = new Subject<string>();

  protected readonly type = "text";

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit(): void {
    this._debouncer
    .pipe(
      takeUntilDestroyed(this._destroyRef),
      debounceTime(this.debounceTimer()),
    )
    .subscribe( value => {
      this.onDebounce.emit(value);
      this.onTouched();
    });
  }

  onKeyPress( searchTerm: string ) {
    this.onChange(searchTerm);
    this._debouncer.next(searchTerm);
  }

  onBlur() {
    this.onTouched();
  }

  writeValue(value: string|null): void {
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

