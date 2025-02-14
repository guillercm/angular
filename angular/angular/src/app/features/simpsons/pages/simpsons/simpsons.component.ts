import { Component, effect, inject, signal } from '@angular/core';
import { Simpson } from '@features/simpsons/interfaces/simpson.interface';
import { SimpsonsService } from '@features/simpsons/services/simpsons.service';
import { take } from 'rxjs';
import { PatoFormComponent } from "@shared/components/controls/pato-form/pato-form.component";
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/pato-data-form.interface';
import { FormGroup, Validators } from '@angular/forms';
import { PatoInputComponent } from '@shared/components/controls/search-box/pato-input.component';
import { PatoFormComponentType } from '@shared/components/controls/pato-form/interfaces/pato-form-component-type.interface';
import { PatoDataFormChange } from '@shared/components/controls/pato-form/interfaces/pato-form-change.interface';
import { PatoFormFieldComponent } from '@shared/components/controls/pato-form-field/pato-form-field.component';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '@features/simpsons/components/form-field/form-field.component';
import { InterceptorService } from '@core/interceptors/services/interceptor.service';
import { HttpStatusCode } from '@angular/common/http';
import { LoaderInterceptorData } from '@core/interceptors/interfaces/loader-interceptor-data.interface';
import { ModalService, NgbdModalContent } from '@core/services/modal/modal.service';

function createPatoFormComponent<T>(data: PatoFormComponentType<T>): PatoFormComponentType<T> {
  return data;
}

@Component({
  selector: 'features-simpsons',
  imports: [CommonModule, PatoFormComponent],
  templateUrl: './simpsons.component.html',
  styleUrl: './simpsons.component.css'
})
export default class SimpsonsComponent {

  private readonly _interceptorService = inject(InterceptorService);

  private readonly _simpsonsServices = inject(SimpsonsService);

  private readonly _modalService = inject(ModalService);

  protected form = signal<FormGroup|null>(null);

  protected formFieldComponent = FormFieldComponent

  protected dataForm: PatoDataForm = {
    fullName: createPatoFormComponent({
      component: PatoInputComponent,
      value: "",
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(6)],
      inputs: {
        control: {
          debounceTimer: 0,
          placeholder: "nombre"
        },
        formField: {
          label: "Nombre completo",
        }
      },
      classes: {
        formField: "mt-3 col-6",
        control: "input-group"
      }
    }),
    personality: createPatoFormComponent({
      component: PatoInputComponent,
      value: "",
      valueChangesSubscribe: true,
      inputs: {
        control: {
          debounceTimer: 0,
          placeholder: "personalidad"
        },
        formField: {
          label: "Personalidad"
        }
      },
      classes: {
        formField: "mt-3 col-6",
        control: "input-group"
      }
    })
  };

  effectInterceptorError = effect(() => {
    const data = this._interceptorService.httpErrorData();
    if (!data) return;
    switch (data.error.status) {
        case HttpStatusCode.NotFound:
            console.log("No se encontró el simpson:(")
    }
  })

  effectTimeoutError = effect(() => {
    const data = this._interceptorService.timeoutErrorData();
    if (!data) return;
    this._modalService.open({
      component: NgbdModalContent,
      inputs: {
          name: "Guille"
      },
      options: {
        animation: true
      }
    });
  })

  cargando = signal(false);

  effectLoader = effect(() => {
    
    const data = this._interceptorService.loaderData().filter((value: LoaderInterceptorData) => {
      return value.req.url.includes("simpson")
    });
    this.cargando.set(data.length > 0)
  })

  

  onBuildForm(form: FormGroup | null) {
    this.form.set(form);
  }

  onChangeControl(data: PatoDataFormChange) {
    console.log(data)
  }

  onSubmit(data: any) {
    console.log(data);
  }


  ngOnInit(): void {
    this._simpsonsServices.getSimpsonById(2).pipe(take(1)).subscribe((simpson: Simpson) => {
      console.log(simpson)
    })
    this._simpsonsServices.getSimpsonsWithDelay(4).pipe(take(1)).subscribe((simpsons: Simpson[]) => {
      console.log(simpsons)
    })
  }
}
