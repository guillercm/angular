import { AbstractControl, ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, OnInit, output, signal, DestroyRef } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GrcmFormComponent } from '../form/grcm-form.component';
import { GrcmFormField } from '../form/interfaces/form-field.interface';



@Component({
  selector: 'grcm-input',
  templateUrl: './grcm-input.component.html',
  styles: ``,
  imports: [CommonModule, ReactiveFormsModule]
})
export class GrcmInputComponent implements OnInit, ControlValueAccessor {

  private readonly _grcmFormComponent = inject(GrcmFormComponent);

  private readonly _destroyRef = inject(DestroyRef);

  protected readonly formField = input.required<GrcmFormField>();

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
      this._grcmFormComponent.onSubmit();
    });
  }

  change( value: string ) {
    this._onTouched();
    this._onChange(value);
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

