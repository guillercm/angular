/* eslint-disable @typescript-eslint/no-explicit-any */

import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, ViewContainerRef, computed, inject, input, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GrcmFormField } from '../form/interfaces/form-field.interface';
import { GrcmFormComponent } from '../form/grcm-form.component';

@Component({
  selector: 'lib-grcm-form-field',
  imports: [CommonModule],
  templateUrl: './grcm-form-field.component.html',
  styleUrl: './grcm-form-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'form-group'
  }
})
export class GrcmFormFieldComponent implements OnInit, GrcmFormField {

  private readonly _destroyRef = inject(DestroyRef);

  public controlView = viewChild.required('controlView', { read: ViewContainerRef })

  public control = input.required<AbstractControl<any>>();

  public id = input.required<string>();

  private readonly _formComponent = inject(GrcmFormComponent);

  public label = input<string>("");

  private _isRequired = signal(false);
  protected readonly isRequired = this._isRequired.asReadonly();

  private _useCompleteLabel = signal(false);
  protected readonly useCompleteLabel = this._useCompleteLabel.asReadonly();

  public readonly requiredTag = "*";
  public readonly optionalTag = "(Opcional)";

  protected readonly form = computed(() => this._formComponent.form())

  public readonly completeLabel = computed(() => {
    return this.label() + (this.useCompleteLabel() ? (this.isRequired() ? this.requiredTag : this.optionalTag) : "");
  })

  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    this.setIsRequired();
    this.initControlStatusChanges();
    this.initFormStatusChanges();
  }

  private initControlStatusChanges() {
    this.control().statusChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this.setIsRequired();
    })
  }

  private initFormStatusChanges() {
    const form = this._formComponent.form();
    if (!form) return;
    this.setUseCompleteLabel(form);
    form.statusChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this.setUseCompleteLabel(form);
    })
  }

  private setUseCompleteLabel(form: FormGroup<any>) {
    let requiredControls = 0;
    const keys = Object.keys(form.controls);
    keys.forEach(key => {
      if (this.controlIsRequired(form.controls[key])) requiredControls++;
    });
    const keysLen = keys.length / 2;
    if (this.isRequired() && requiredControls <= keysLen) {
      this._useCompleteLabel.set(true)
    } else {
      this._useCompleteLabel.set(!this.isRequired() && requiredControls > keysLen)
    }
  }

  setIsRequired() {
    this._isRequired.set(this.controlIsRequired(this.control()));
  }

  controlIsRequired(control: AbstractControl) {
    return control.hasValidator(Validators.required);
  }

  getError(errors: any) {
    const keys = Object.keys(errors);
    if (!keys.length) return '';
    const error = keys[0];
    const data = errors[keys[0]];
    switch (error) {
      case 'required':
        return 'Este campo es requerido.';
      case 'minlength':
        return `Tiene que tener como mínimo ${data.requiredLength} caracteres.`;
      case 'maxlength':
        return `Tiene que tener como máximo ${data.requiredLength} caracteres.`;
      case 'pattern':
        return 'La contraseña debe contener al menos una letra mayúscula, una minúscula y un símbolo especial.';
      default:
        return 'Revisa el valor ingresado.'
    }
  }

}
