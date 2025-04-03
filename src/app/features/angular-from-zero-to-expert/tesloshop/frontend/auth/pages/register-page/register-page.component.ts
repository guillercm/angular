import { AuthService } from '../../services/auth.service';
import { Component, DestroyRef, inject } from '@angular/core';
import { createPatoControl } from '@shared/components/controls/pato-form/utils/createPatoControl.function';
import { FormFieldComponent } from '@shared/components/controls/form-field/form-field.component';
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/data-form.interface';
import { PatoFormComponent } from '@shared/components/controls/pato-form/pato-form.component';
import { PatoInputComponent } from '@shared/components/controls/pato-input/pato-input.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponsePatoForm } from '@shared/components/controls/pato-form/interfaces/pato-response-form.interface';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppTranslateService } from '@core/services/translate/app-translate.service';
import { AppTranslatePipe } from '@core/pipes/app-translate.pipe';
import { FormUtils } from '../../../../../../../utils/form-utils';

@Component({
  selector: 'auth-register-page',
  imports: [RouterLink, ReactiveFormsModule, PatoFormComponent, SharedButtonComponent, AppTranslatePipe],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  private readonly _authService = inject(AuthService);
  private readonly _appTranslateService = inject(AppTranslateService);

  protected dataForm: PatoDataForm = {
    form: {
      id: 'tesloshop-login',
      validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'repeatPassword')]
    },
    controls: {
      fullName: createPatoControl({
        component: PatoInputComponent,
        formFieldComponent: FormFieldComponent,
        value: "",
        validators: [Validators.required, Validators.minLength(6)],
        asyncValidators: [],
        valueChangesSubscribe: true,
        args: {
          control: {
            icon: "person-fill"
          },
          formField: {
            label: this._appTranslateService.get('i18n.common.fullName'),
          }
        },
        classes: {
          formField: "mt-3 col-6 mt-4",
          control: "input-group"
        }
      }),
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
            label: this._appTranslateService.get('i18n.common.email'),
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
        validators: [Validators.required, Validators.minLength(6), Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)],
        asyncValidators: [],
        valueChangesSubscribe: true,
        args: {
          control: {
            icon: "key-fill"
          },
          formField: {
            label: this._appTranslateService.get('i18n.common.password'),
          }
        },
        classes: {
          formField: "mt-3 col-6 mt-4",
          control: "input-group"
        }
      }),
      repeatPassword: createPatoControl({
        component: PatoInputComponent,
        formFieldComponent: FormFieldComponent,
        value: "",
        validators: [Validators.required, Validators.minLength(6), Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)],
        asyncValidators: [],
        valueChangesSubscribe: true,
        args: {
          control: {
            icon: "key-fill"
          },
          formField: {
            label: this._appTranslateService.get('i18n.common.repeatPassoword'),
          }
        },
        classes: {
          formField: "mt-3 col-6 mt-4",
          control: "input-group"
        }
      })
    }
  };


  onSubmit(data: ResponsePatoForm) {

    const { email = '', password = '', fullName = '' } = data.content;

    this._authService.register(email!, password!, fullName!).pipe(takeUntilDestroyed(this._destroyRef)).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this._router.navigate(['../..'], { relativeTo: this._activatedRoute });
        return;
      }
    });
  }
}
