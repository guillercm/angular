import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { SharedButtonComponent } from '../../../../../shared/components/button/shared-button.component';
import { GrcmFormFieldComponent } from '../../controls/form-field/grcm-form-field.component';
import { GrcmFormComponent } from '../../controls/form/grcm-form.component';
import { GrcmDataForm } from '../../controls/form/interfaces/data-form.interface';
import { GrcmDataFormChange } from '../../controls/form/interfaces/form-change.interface';
import { ResponseGrcmForm } from '../../controls/form/interfaces/response-form.interface';
import { createGrcmControl } from '../../controls/form/utils/createGrcmControl';
import { GrcmInputComponent } from '../../controls/input/grcm-input.component';

@Component({
  selector: 'forms-login',
  imports: [CommonModule, SharedButtonComponent, GrcmFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected dataForm: GrcmDataForm = {
    form: {
      id: 'form'
    },
    controls: {
      username: createGrcmControl({
        component: GrcmInputComponent,
        formFieldComponent: GrcmFormFieldComponent,
        value: "",
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(6)],
        args: {
          control: {
            debounceTimer: 1000,
            placeholder: "Escriba su usuario",
            icon: "person-circle",
            autocomplete: false,
            debounce: (value: string) => {
              //console.log(value)
            }
          },
          formField: {
            label: "Usuario"
          }
        },
        classes: {
          formField: "mt-3 col-12",
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
          formField: "mt-3 col-12",
          control: "input-group"
        }
      }),
    }
  };

  buildForm(form: FormGroup | null) {
    console.log(form);
  }

  onChangeControl(data: GrcmDataFormChange) {
    console.log(data)
  }

  onSubmit(data: ResponseGrcmForm) {
    console.log(data);
  }

  getErrors(errors: ValidationErrors | null) {
    console.log({errors})
    if (!errors) return [];
    return Object.keys(errors);
  }

  log(data: any) {
    console.info(data)
  }
}
