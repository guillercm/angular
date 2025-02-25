import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { createPatoControl } from '@shared/components/controls/pato-form/utils/createPatoControl.function';
import { FormFieldComponent } from '@shared/components/controls/form-field/form-field.component';
import { FormGroup, Validators } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { InterceptorService } from '@core/interceptors/services/interceptor.service';
import { ModalService } from '@core/services/modal/modal.service';
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/pato-data-form.interface';
import { PatoDataFormChange } from '@shared/components/controls/pato-form/interfaces/pato-form-change.interface';
import { PatoFormComponent } from "@shared/components/controls/pato-form/pato-form.component";
import { PatoInputComponent } from '@shared/components/controls/pato-input/pato-input.component';
import { Simpson } from '@features/simpsons/interfaces/simpson.interface';
import { SimpsonsService } from '@features/simpsons/services/simpsons.service';
import { Observable, Observer, catchError, delay, of, startWith, take, tap, throwError } from 'rxjs';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';
import { SimpsonCardComponent } from "../../components/simpson-card/simpson-card.component";
import { RepeatPipe } from '@shared/pipes/repeat/repeat.pipe';
import { TimeoutModalComponent } from '@core/components/timeout-modal/timeout-modal.component';


@Component({
  selector: 'features-simpsons',
  imports: [CommonModule, PatoFormComponent, SharedButtonComponent, SimpsonCardComponent, RepeatPipe],
  templateUrl: './simpsons.component.html',
  styleUrl: './simpsons.component.css'
})
export default class SimpsonsComponent {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _interceptorService = inject(InterceptorService);

  private readonly _simpsonsServices = inject(SimpsonsService);

  private readonly _modalService = inject(ModalService);

  protected form = signal<FormGroup | null>(null);

  private _simpsons = signal<Simpson[]>([]);

  protected readonly simpsons = this._simpsons.asReadonly();

  protected simpsonsObservable: Observable<Simpson[]> | null = null;

  constructor() {
    let initialRun = true;
    effect(() => {
      const data = this._interceptorService.httpErrorData();
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
      //console.log(data)
      this._modalService.open({
        component: TimeoutModalComponent,
        destroyRef: this._destroyRef,
        args: {
          name: data.error.message,
          onClicked: (event: string) => {
            //console.log(event)
          }
        },
        options: {
          animation: true
        }
      });
    })

    effect(() => {
      const isLoading = this._interceptorService.isLoadingSomeHttpRequest();
      if (initialRun) {
        initialRun = false;
      }

      // ejecutaremos el código cuando hayamos echo una solicitud http y esta tarde mucho en hacerse
      if (isLoading) {
        //console.log("loading...")
      } else {
        //console.log("terminó de cargar :)")
      }
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
    //console.log(data)
  }

  onSubmit(data: any) {
    //console.log(data);
  }

  private _state = signal<'default' | 'loading' | 'error' | 'loaded' | '0 results'>('default')
  protected readonly state = this._state.asReadonly();

  loadSimpsons() {
    this._state.set('loading');
    this._simpsonsServices.getSimpsons().pipe(
      tap((simpsons: Simpson[]) => {
      this._simpsons.set(simpsons);
    })).subscribe()

  }


  ngOnInit(): void {

    // this._simpsonsServices.getSimpsonById(2).pipe(take(1)).subscribe((simpson: Simpson) => {
    //   //console.log(simpson)
    // })



  }
}
