import { Component, computed, input, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { PatoFormField } from '../pato-form/interfaces/pato-form-field.interface';
import { PatoAllowedFiles } from './interfaces/allowedFiles.interface';

@Component({
  selector: 'pato-input-file',
  imports: [],
  templateUrl: './pato-input-file.component.html',
  styleUrl: './pato-input-file.component.css'
})
export class PatoInputFileComponent {

  protected readonly formField = input.required<PatoFormField>();

  public additionalClasses = input<string>();

  private _value = signal<any>("");
  protected readonly value = this._value.asReadonly();

  private _disabled = signal<boolean>(false);
  protected readonly disabled = this._disabled.asReadonly();

  public multiple = input<boolean>(false);

  public directory = input<boolean>(false);

  public control = computed<AbstractControl<any>>(() => this.formField().control() )

  public id = computed<string>(() => this.formField().id())

  public allowedFiles = input<PatoAllowedFiles>({});


  get accept_string() {
    const allowedFiles = this.allowedFiles();
    if (!allowedFiles) return '';
    const keys = Object.keys(allowedFiles);
    const accept_string: string[] = [];
    for (const key of keys) {
      if ((allowedFiles as any)[key]) {
        accept_string.push('.' + key);
      }
    }
    return accept_string.join(',');
  }


  onChange(target: any): void {
    // TO DO: setear en value los ficheros subidos por el usuario
    /*
    const reader = new FileReader();
    reader.onload = () => {
      console.log(this.value)
      this.value = reader.result;
    };
    reader.readAsText(target.files[0]);
    this.propagateChange(reader);
    */
    this._onChange(target.value);
  }

  onBlur(): void {
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


  writeValue(value: any): void {
    if (!value) value = ''
    this._value.set(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }
}
