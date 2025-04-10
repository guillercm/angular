/* eslint-disable @typescript-eslint/no-unused-vars */

import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { GrcmFormFieldComponent } from '../../../controls/form-field/grcm-form-field.component';
import { GrcmFormComponent } from '../../../controls/form/grcm-form.component';
import { GrcmDataForm } from '../../../controls/form/interfaces/data-form.interface';
import { GrcmDataFormChange } from '../../../controls/form/interfaces/form-change.interface';
import { ResponseGrcmForm } from '../../../controls/form/interfaces/response-form.interface';
import { createGrcmControl } from '../../../controls/form/utils/createGrcmControl';
import { GrcmInputComponent } from '../../../controls/input/grcm-input.component';
import { GrcmButtonComponent } from '../../../button/grcm-button.component';
import { GrcmUserLoginExample } from './interfaces/grcm-user-login-example.interface';


@Component({
  selector: 'lib-grcm-example-login',
  imports: [CommonModule, GrcmButtonComponent, GrcmFormComponent],
  templateUrl: './example-login.component.html',
  styleUrl: './example-login.component.css'
})
export class GrcmExampleLoginComponent {

  private _responseForm = signal<GrcmUserLoginExample|null>(null);
  protected readonly responseForm = this._responseForm.asReadonly();

  public submitForm = output<GrcmUserLoginExample>();

  protected dataForm: GrcmDataForm = {
    form: {
      id: 'login'
    },
    controls: {
      username: createGrcmControl({
        component: GrcmInputComponent,
        formFieldComponent: GrcmFormFieldComponent,
        value: "",
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        args: {
          control: {
            debounceTimer: 1000,
            placeholder: "Escriba su usuario",
            icon: "person-circle",
            autocomplete: false,
            // debounce: (value: string) => {
            //   console.log(value)
            // }
          },
          formField: {
            label: "Usuario"
          }
        },
        classes: {
          control: "input-group"
        }
      }),
      password: createGrcmControl({
        component: GrcmInputComponent,
        formFieldComponent: GrcmFormFieldComponent,
        value: "",
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[-_!@#$%^&*(),.?":{}|<>]).+$')],
        args: {
          control: {
            type: 'password',
            placeholder: "Escriba su contraseña",
            icon: "lock",
            autocomplete: false,
          },
          formField: {
            label: "Contraseña"
          }
        },
        classes: {
          control: "input-group"
        }
      }),
    }
  };

  buildForm(form: FormGroup | null) {
    // console.log(form);
  }

  onChangeControl(data: GrcmDataFormChange) {
    // console.log(data)
  }

  onSubmit(data: ResponseGrcmForm) {
    const user: GrcmUserLoginExample = {...data.form.value}
    this._responseForm.set(user);
    this.submitForm.emit(user);
  }

  getErrors(errors: ValidationErrors | null) {
    console.log({errors})
    if (!errors) return [];
    return Object.keys(errors);
  }

}
