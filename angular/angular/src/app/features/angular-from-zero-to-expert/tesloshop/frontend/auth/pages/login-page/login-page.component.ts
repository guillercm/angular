import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { createPatoControl } from '@shared/components/controls/pato-form/utils/createPatoControl.function';
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/pato-data-form.interface';
import { FormFieldComponent } from '@shared/components/controls/form-field/form-field.component';
import { PatoInputComponent } from '@shared/components/controls/pato-input/pato-input.component';
import { PatoFormComponent } from '@shared/components/controls/pato-form/pato-form.component';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';
import { ResponsePatoForm } from '@shared/components/controls/pato-form/interfaces/pato-response-form.interface';


@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, PatoFormComponent, SharedButtonComponent],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  authService = inject(AuthService);

  protected dataForm: PatoDataForm = {
    email: createPatoControl({
      component: PatoInputComponent,
      formFieldComponent: FormFieldComponent,
      value: "",
      validators: [Validators.required, Validators.email],
      args: {
        control: {
          placeholder: "",
          icon: "envelope-at-fill"
        },
        formField: {
          label: "Correo electrónico"
        }
      },
      classes: {
        formField: "col-12",
        control: "input-group"
      }
    }),
    password: createPatoControl({
      component: PatoInputComponent,
      formFieldComponent: FormFieldComponent,
      value: "",
      validators: [Validators.required, Validators.minLength(6)],
      asyncValidators: [],
      valueChangesSubscribe: true,
      args: {
        control: {
          icon: "key-fill"
        },
        formField: {
          "label": "Contraseña"
        }
      },
      classes: {
        formField: "mt-3 col-6 mt-4",
        control: "input-group"
      }
    })
  };


  onSubmit(data: ResponsePatoForm) {

    const { email = '', password = '' } = data.content;

    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this._router.navigate(['../..'], { relativeTo: this._activatedRoute });
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    });
  }

  // Check Authentication

  // Registro

  // Logout
}
