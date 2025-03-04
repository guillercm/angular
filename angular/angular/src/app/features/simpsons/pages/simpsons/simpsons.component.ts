import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { createPatoControl } from '@shared/components/controls/pato-form/utils/createPatoControl.function';
import { FormFieldComponent } from '@shared/components/controls/form-field/form-field.component';
import { FormGroup, Validators } from '@angular/forms';
import { HttpRequest, HttpStatusCode } from '@angular/common/http';
import { InterceptorService } from '@core/interceptors/services/interceptor.service';
import { ModalService } from '@core/services/modal/modal.service';
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/pato-data-form.interface';
import { PatoDataFormChange } from '@shared/components/controls/pato-form/interfaces/pato-form-change.interface';
import { PatoFormComponent } from "@shared/components/controls/pato-form/pato-form.component";
import { PatoInputComponent } from '@shared/components/controls/pato-input/pato-input.component';
import { Simpson } from '@features/simpsons/interfaces/simpson.interface';
import { SimpsonsService } from '@features/simpsons/services/simpsons.service';
import { MonoTypeOperatorFunction, Observable, Observer, catchError, delay, of, startWith, take, tap, throwError } from 'rxjs';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';
import { SimpsonCardComponent } from "../../components/simpson-card/simpson-card.component";
import { RepeatPipe } from '@shared/pipes/repeat/repeat.pipe';
import { TimeoutModalComponent } from '@core/components/timeout-modal/timeout-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoaderInterceptorData } from '@core/interceptors/interfaces/loader-interceptor-data.interface';
import { StateHttpRequestPipe } from '@core/pipes/state-http-request.pipe';

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
    source$.pipe(tap(v => {console.log(SimpsonsComponent.subs, source$)}));
}
@Component({
  selector: 'features-simpsons',
  imports: [CommonModule, PatoFormComponent, SharedButtonComponent, SimpsonCardComponent, RepeatPipe, StateHttpRequestPipe],
  templateUrl: './simpsons.component.html',
  styleUrl: './simpsons.component.css'
})
export default class SimpsonsComponent {

  public static subs:any = null;

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _interceptorService = inject(InterceptorService);

  private readonly _simpsonsServices = inject(SimpsonsService);

  private readonly _modalService = inject(ModalService);

  protected form = signal<FormGroup | null>(null);

  private _simpsons = signal<Simpson[]>([]);

  protected readonly simpsons = this._simpsons.asReadonly();

  protected simpsonsObservable: Observable<Simpson[]> | null = null;

  public state = signal<null | 'loading' | 'error'>(null);

  constructor() {
    let initialRun = true;
    effect(() => {
      const data = this._interceptorService.httpErrorData();
      if (data && data.context.id === "getSimpsons") {
        this.state.set("error");
      }
      if (initialRun) return;
      if (!data) return;
      switch (data.error.status) {
        case HttpStatusCode.NotFound:
          //console.log("No se encontró el simpson:(")
      }
    })

    effect(() => {
      const data = this._interceptorService.timeoutErrorData();
      if (initialRun) return;
      if (!data) return;
    })

    effect(() => {
      const isLoading = this._interceptorService.loadingHttpRequests().some((value: LoaderInterceptorData) => value.context.id === "getSimpsons");
      this.state.set(isLoading ? "loading" : this.state());
      if (initialRun) {
        initialRun = false;
      }

      // ejecutaremos el código cuando hayamos echo una solicitud http y esta tarde mucho en hacerse
      // if (isLoading) {
      //   console.log("loading simpsons...")
      // } else {
      //   console.log("terminó de cargar :)")
      // }
    })
  }

  protected dataForm: PatoDataForm = {
    fullName: createPatoControl({
      component: PatoInputComponent,
      formFieldComponent: FormFieldComponent,
      value: "",
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(6)],
      args: {
        control: {
          debounceTimer: 1000,
          placeholder: "nombre",
          icon: "person-circle",
          onDebounce: (value: string) => {
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
    personality: createPatoControl({
      component: PatoInputComponent,
      formFieldComponent: FormFieldComponent,
      value: "",
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
    }),
    algo: createPatoControl({
      component: PatoInputComponent,
      formFieldComponent: FormFieldComponent,
      value: "",
      validators: [],
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

  onBuildForm(form: FormGroup | null) {
    this.form.set(form);
  }

  onChangeControl(data: PatoDataFormChange) {
    console.log(data)
  }

  onSubmit(data: any) {
    console.log(data);
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
