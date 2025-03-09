import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject, linkedSignal, resource, signal } from '@angular/core';
import { createPatoControl } from '@shared/components/controls/pato-form/utils/createPatoControl.function';
import { FormFieldComponent } from '@shared/components/controls/form-field/form-field.component';
import { FormGroup, Validators } from '@angular/forms';
import { InterceptorService } from '@core/interceptors/services/interceptor.service';
import { ModalService } from '@core/services/modal/modal.service';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/pato-data-form.interface';
import { PatoDataFormChange } from '@shared/components/controls/pato-form/interfaces/pato-form-change.interface';
import { PatoFormComponent } from "@shared/components/controls/pato-form/pato-form.component";
import { PatoInputComponent } from '@shared/components/controls/pato-input/pato-input.component';
import { RepeatPipe } from '@shared/pipes/repeat/repeat.pipe';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';
import { Simpson } from '@features/simpsons/interfaces/simpson.interface';
import { SimpsonCardComponent } from "../../components/simpson-card/simpson-card.component";
import { SimpsonsService } from '@features/simpsons/services/simpsons.service';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormUtils } from '@features/simpsons/utils/custom-validators';
// export function addCustomHeader(customValue: string): MonoTypeOperatorFunction<T> {
//   return tap((req: HttpRequest<any>) => {
//     // Clonar la solicitud y agregar el header
//     const clonedRequest = req.clone({
//       setHeaders: {
//         'X-Custom-Header': customValue
//       }
//     });

//     // Regresar la nueva solicitud clonada
//     return clonedRequest;
//   });
// }

function logWithTag<T>(tag: string): (source$: Observable<T>) => Observable<T> {
  return source$ =>
    source$.pipe(tap(v => { console.log(SimpsonsComponent.subs, source$) }));
}
@Component({
  selector: 'features-simpsons',
  imports: [CommonModule, PatoFormComponent, SharedButtonComponent, SimpsonCardComponent, RepeatPipe],
  templateUrl: './simpsons.component.html',
  styleUrl: './simpsons.component.css'
})
export default class SimpsonsComponent {

  public static subs: any = null;

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _interceptorService = inject(InterceptorService);

  private readonly _simpsonsServices = inject(SimpsonsService);

  private readonly _modalService = inject(ModalService);

  protected form = signal<FormGroup | null>(null);

  private _simpsons = signal<Simpson[]>([]);

  protected readonly simpsons = this._simpsons.asReadonly();

  protected simpsonsObservable: Observable<Simpson[]> | null = null;

  protected simpsonsRequest = computed(() => this._interceptorService.getHttpRequestById("getSimpsons"))

  private _simpsonId = signal<number>(1);

  protected readonly simpsonId = this._simpsonId.asReadonly();

  private _linkedIdSimpson = linkedSignal<number>(() => this.simpsonId());

  simpsonEffects = effect(() => {
    this._linkedIdSimpson.set(78)
    console.log("idSimpson " + this._linkedIdSimpson())

    console.log(this.simpsonsRequest())

  })

  simpsonResource = resource({
    request: () => ({ simpsonId: this.simpsonId() }),
    loader: async ({ request }) => {
      const { simpsonId } = request;
      return await firstValueFrom(this._simpsonsServices.getSimpsonById(simpsonId).pipe(
        tap((value) => console.log(value))
      ))
    },
  });

  simpsonRxResource = rxResource({
    request: () => ({ simpsonId: this.simpsonId() }),
    loader: ({ request }) => {
      const { simpsonId } = request;
      return this._simpsonsServices.getSimpsonById(simpsonId).pipe(
        tap((value) => console.log(value, this.simpsonRxResource.error()))
      )
    },
  });

  protected dataForm: PatoDataForm = {
    fullName: createPatoControl({
      component: PatoInputComponent,
      formFieldComponent: FormFieldComponent,
      value: "",
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(6), FormUtils.validatorSimpson],
      args: {
        control: {
          debounceTimer: 1000,
          placeholder: "nombre",
          icon: "person-circle",
          debounce: (value: string) => {
            //console.log(value)
          }
        },
        formField: {
          label: "Nombre completo",
        }
      },
      classes: {
        formField: "mt-3 col-12",
        control: "input-group"
      }
    }),
    color: createPatoControl({
      component: PatoInputComponent,
      formFieldComponent: FormFieldComponent,
      value: "",
      validators: [Validators.required],
      asyncValidators: [FormUtils.asycnValidatorSimpson],
      valueChangesSubscribe: true,
      args: {
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

  buildForm(form: FormGroup | null) {
    this.form.set(form);
  }

  onChangeControl(data: PatoDataFormChange) {
    console.log(data)
  }

  onSubmit(data: any) {
    console.log(data);
    this._simpsonId.update((value: number) => value + 1)
  }

  loadSimpsons() {
    this._simpsonsServices.getSimpsons().pipe(
      takeUntilDestroyed(this._destroyRef),
      tap((simpsons: Simpson[]) => {
        this._simpsons.set(simpsons);
      })).subscribe()
  }

  ngOnInit(): void {

  }
}
