import { AbstractControl, ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, OnInit, output, signal, DestroyRef } from '@angular/core';
import { PatoFormField } from '../pato-form/interfaces/pato-form-field.interface';
import { Subject, debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PatoFormComponent } from '../pato-form/pato-form.component';



@Component({
  selector: 'pato-input',
  templateUrl: './pato-input.component.html',
  styles: ``,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PatoInputComponent implements OnInit, ControlValueAccessor {

  private readonly _patoFormComponent = inject(PatoFormComponent);

  private readonly _destroyRef = inject(DestroyRef);

  protected readonly formField = input.required<PatoFormField>();

  public placeholder = input<string>('');

  public debounceTimer = input<number>(300);

  public icon = input<string>();

  public autocomplete = input<boolean>(true);

  public submitFormOnDebounce = input<boolean>(false);

  public changeValue = output<string>();

  public debounce = output<string>();

  public control = computed<AbstractControl<any>>(() => this.formField().control() )

  public id = computed<string>(() => this.formField().id())

  public additionalClasses = input<string>();

  private _value = signal<string>("");
  protected readonly value = this._value.asReadonly();

  private _disabled = signal<boolean>(false);
  protected readonly disabled = this._disabled.asReadonly();

  private _debouncer: Subject<string> = new Subject<string>();

  protected readonly type = "text";


  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    this._debouncer
    .pipe(
      takeUntilDestroyed(this._destroyRef),
      debounceTime(this.debounceTimer()),
    )
    .subscribe( value => {
      this.debounce.emit(value);

      if (this.submitFormOnDebounce())
      this._patoFormComponent.onSubmit();
    });
  }

  keyPress( searchTerm: string ) {
    this._onTouched();
    this._onChange(searchTerm);
    console.log(searchTerm)
    // this._debouncer.next(searchTerm);
  }

  onBlur() {
    this._onTouched();
  }

  _onChange: (_: any) => void = () => {};
  _onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }


  writeValue(value: string|null): void {
    if (!value) value = ''
    this._value.set(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }


}

