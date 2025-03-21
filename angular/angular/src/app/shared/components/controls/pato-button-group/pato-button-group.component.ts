import {  PatoOptionsButtonGroup } from './interfaces/options-button-group.type';
import { CommonModule } from '@angular/common';
import { Component, isSignal } from '@angular/core';
import { effect, forwardRef, linkedSignal } from '@angular/core';
import { GenericObject } from '@core/interfaces/generic-object/generic-object.interface';
import { input } from '@angular/core';
import { PatoControlsService } from '../services/pato-controls.service';
import { PatoDataButtonGroup } from './interfaces/data-button-group.interface';
import { PatoFormField } from '../pato-form/interfaces/pato-form-field.interface';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';

@Component({
  selector: 'pato-button-group',
  templateUrl: './pato-button-group.component.html',
  styleUrl: './pato-button-group.component.css',
  imports: [CommonModule, ReactiveFormsModule, SharedButtonComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PatoButtonGroupComponent),
      multi: true
    }
  ]
})
export class PatoButtonGroupComponent implements ControlValueAccessor {

  protected readonly formField = input.required<PatoFormField>();

  public readonly items = input.required<GenericObject[]>();

  public readonly options = input<PatoOptionsButtonGroup>({});

  public readonly disabled = input<boolean>();
  private _isDisabled = linkedSignal(() => this.disabled() );
  protected readonly isDisabled = this._isDisabled.asReadonly();


  private _data = linkedSignal({
    source: this.items,
    computation: (items: GenericObject[]) => {
      return items.map((item: GenericObject, index: number): PatoDataButtonGroup => {
        return {
          item: item,
          options: {
            ...PatoControlsService.getDefaultOptions<PatoOptionsButtonGroup>(this.options(), item, index),
            variant: this.getOption(item, index, "variant")
          }
        }
      })
    },
  });

  protected readonly data = this._data.asReadonly();

  protected isSignal = isSignal

  protected dataDisabled(data: PatoDataButtonGroup) {
    return this.isDisabled() || data.options.disabled;
  }

  protected toggleSelected(data: PatoDataButtonGroup) {
    if (this.dataDisabled(data)) return;
    PatoControlsService.toggleSelected(this._data, data)
    this._onTouched();
    this._onChange(PatoControlsService.getValues(this.options(), this.data()));
  }

  private getOption(item: GenericObject, index: number, key: string) {
    switch (key) {
      case 'variant':
        const variantOpt = this.options()?.variant || "variant";
        if (typeof variantOpt === "string") return item[variantOpt] || "primary"
        return variantOpt(item, index)
    }
    return null;
  }

  _onChange: (_: any) => void = () => {};
  _onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  writeValue(items: any): void {
    console.log(items)
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }

}
