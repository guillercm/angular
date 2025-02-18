import { Component, computed, DestroyRef, forwardRef, inject, input, OnInit, output, signal, InputSignal } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PatoFormField {
  control: InputSignal<AbstractControl<any>>,
  id: InputSignal<string>
}

@Component({
  selector: 'pato-input',
  templateUrl: './pato-input.component.html',
  styles: ``,
  imports: [CommonModule, ReactiveFormsModule],
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

  protected readonly formField = input.required<PatoFormField>();

  public control = computed<AbstractControl<any>>(() => this.formField().control() )

  public id = computed<string>(() => this.formField().id())

  private _value = signal<string>("");
  protected readonly value = this._value.asReadonly();

  private _disabled = signal<boolean>(false);
  protected readonly disabled = this._disabled.asReadonly();

  public placeholder = input<string>('');

  public debounceTimer = input<number>(300);

  public icon = input<string>();

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

