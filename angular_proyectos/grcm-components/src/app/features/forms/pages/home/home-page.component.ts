import { Component } from '@angular/core';
import { GrcmFormComponent } from "../../components/controls/form/grcm-form.component";
import { SharedButtonComponent } from '../../../../shared/components/button/shared-button.component';
import { GrcmDataForm } from '../../components/controls/form/interfaces/data-form.interface';
import { createGrcmControl } from '../../components/controls/form/utils/createGrcmControl';
import { GrcmInputComponent } from '../../components/controls/input/grcm-input.component';
import { FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { GrcmDataFormChange } from '../../components/controls/form/interfaces/form-change.interface';
import { ResponseGrcmForm } from '../../components/controls/form/interfaces/response-form.interface';
import { CommonModule } from '@angular/common';
import { GrcmFormFieldComponent } from '../../components/controls/form-field/grcm-form-field.component';

@Component({
  selector: 'forms-home-page',
  imports: [CommonModule, SharedButtonComponent, GrcmFormComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export default class HomePageComponent {

  protected dataForm: GrcmDataForm = {
    form: {
      id: 'form'
    },
    controls: {
      fullName: createGrcmControl({
        component: GrcmInputComponent,
        formFieldComponent: GrcmFormFieldComponent,
        value: "",
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(6)],
        args: {
          control: {
            debounceTimer: 1000,
            placeholder: "Usuario",
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
