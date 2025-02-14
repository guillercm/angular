import { CommonModule } from '@angular/common';
import { Component, ViewContainerRef, effect, inject, input, signal, viewChild } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { LanguageService } from '@core/services/language/language.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { PatoFormComponent } from '@shared/components/controls/pato-form/pato-form.component';

@Component({
  selector: 'features-form-field',
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent {

  private readonly _formComponent = inject(PatoFormComponent);

  private readonly _languageService = inject(LanguageService);

  public controlView = viewChild.required('controlView', { read: ViewContainerRef })

  public control = input.required<AbstractControl<any>>();

  public id = input.required<string>();

  public label = input.required<string>();

  protected error = signal("");

  getError(errors: ValidationErrors | null) {
    return this._languageService.getByValidationsErrors(errors)
  }

}
