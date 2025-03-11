import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, ViewContainerRef, computed, inject, input, signal, viewChild } from '@angular/core';
import { LanguageService } from '@core/services/language/language.service';
import { PatoFormComponent } from '@shared/components/controls/pato-form/pato-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { PatoFormField } from '../pato-form/interfaces/pato-form-field.interface';

@Component({
  selector: 'features-form-field',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent implements OnInit, PatoFormField {

  public control = input.required<AbstractControl<any>>();

  public id = input.required<string>();

  public controlView = viewChild.required('controlView', { read: ViewContainerRef })

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _formComponent = inject(PatoFormComponent);

  private readonly _languageService = inject(LanguageService);

  public label = input<string>("");

  private _isRequired = signal(false);
  protected readonly isRequired = this._isRequired.asReadonly();

  private _useCompleteLabel = signal(false);
  protected readonly useCompleteLabel = this._useCompleteLabel.asReadonly();

  public readonly completeLabel = computed(() => {
    return (this.isRequired() ? " *" : " (opcional)");
  })

  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    this.initControlStatusChanges();
    this.initFormStatusChanges();
    this.setIsRequired();
  }

  private initControlStatusChanges() {
    this.control().statusChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((value: any) => {
      this.setIsRequired();
    })
  }

  private initFormStatusChanges() {
    const form = this._formComponent.form();
    if (!form) return;
    this.setUseCompleteLabel();
    form.statusChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((value: any) => {
      this.setUseCompleteLabel();
    })
  }

  private setUseCompleteLabel() {
    const form = this._formComponent.form();
    if (!form) return;
    let requiredControls = 0;
    const keys = Object.keys(form.controls);
    keys.forEach(key => {
      if (this.controlIsRequired(form.controls[key])) requiredControls++;
    });
    const keysLen = keys.length / 2;
    if (this.isRequired() && requiredControls <= keysLen) {
      this._useCompleteLabel.set(true)
    } else if (!this.isRequired() && requiredControls > keysLen) {
      this._useCompleteLabel.set(true)
    } else {
      this._useCompleteLabel.set(false)
    }
  }

  setIsRequired() {
    this._isRequired.set(this.controlIsRequired(this.control()));
  }

  controlIsRequired(control: AbstractControl) {
    return control.hasValidator(Validators.required);
  }

  getError(errors: ValidationErrors | null) {
    return this._languageService.getValidationsErrors(errors)
  }

}
