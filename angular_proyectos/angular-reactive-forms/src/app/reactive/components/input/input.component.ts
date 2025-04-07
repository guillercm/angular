import { Component, forwardRef, input, linkedSignal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent {
  value: string = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  public isDisabled = input<boolean>(false);

  private _disabled = linkedSignal(() => this.isDisabled() );

  protected readonly disabled = this._disabled.asReadonly();

  // Método para actualizar el valor cuando el usuario interactúa con el input
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  // Métodos requeridos por ControlValueAccessor
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }
}
