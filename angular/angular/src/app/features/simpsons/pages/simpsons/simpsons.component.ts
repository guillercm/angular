import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, linkedSignal, resource, signal } from '@angular/core';
import { createPatoControl } from '@shared/components/controls/pato-form/utils/createPatoControl.function';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { FormFieldComponent } from '@shared/components/controls/form-field/form-field.component';
import { FormGroup, Validators } from '@angular/forms';
import { InterceptorService } from '@core/interceptors/services/interceptor.service';
import { ModalService } from '@core/services/modal/modal.service';
import { PatoButtonGroupComponent } from '@shared/components/controls/pato-button-group/pato-button-group.component';
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/data-form.interface';
import { PatoDataFormChange } from '@shared/components/controls/pato-form/interfaces/pato-form-change.interface';
import { PatoFormComponent } from "@shared/components/controls/pato-form/pato-form.component";
import { PatoInputComponent } from '@shared/components/controls/pato-input/pato-input.component';
import { RepeatPipe } from '@shared/pipes/repeat/repeat.pipe';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';
import { Simpson } from '@features/simpsons/interfaces/simpson.interface';
import { SimpsonCardComponent } from "../../components/simpson-card/simpson-card.component";
import { SimpsonsService } from '@features/simpsons/services/simpsons.service';
import { ResponsePatoForm } from '@shared/components/controls/pato-form/interfaces/pato-response-form.interface';
import { AppTranslateService } from '@core/services/translate/app-translate.service';
import { AppTranslatePipe } from '@core/pipes/app-translate.pipe';
import { FormUtils } from '../../../../utils/form-utils';


@Component({
  selector: 'features-simpsons',
  imports: [CommonModule, PatoFormComponent, SharedButtonComponent, SimpsonCardComponent, RepeatPipe, AppTranslatePipe],
  templateUrl: './simpsons.component.html',
  styleUrl: './simpsons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
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

  private readonly _appTranslateService = inject(AppTranslateService);

  prueba = this._appTranslateService.get('i18n.common.time.hours', { hours: 45 })


  simpsonEffects = effect(() => {
    this._linkedIdSimpson.set(78)
    console.log("idSimpson " + this._linkedIdSimpson())

    console.log(this.simpsonsRequest())

  })

  // simpsonResource = resource({
  //   request: () => ({ simpsonId: this.simpsonId() }),
  //   loader: async ({ request }) => {
  //     const { simpsonId } = request;
  //     return await firstValueFrom(this._simpsonsServices.getSimpsonById(simpsonId).pipe(
  //       tap((value) => console.log(value))
  //     ))
  //   },
  // });

  // simpsonRxResource = rxResource({
  //   request: () => ({ simpsonId: this.simpsonId() }),
  //   loader: ({ request }) => {
  //     const { simpsonId } = request;
  //     return this._simpsonsServices.getSimpsonById(simpsonId).pipe(
  //       tap((value) => console.log(value, this.simpsonRxResource.error()))
  //     )
  //   },
  // });

  protected dataForm: PatoDataForm = {
    form: {
      id: 'simpsons'
    },
    controls: {
      fullName: createPatoControl({
        component: PatoInputComponent,
        formFieldComponent: FormFieldComponent,
        value: "",
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(6), FormUtils.validatorSimpson],
        args: {
          control: {
            debounceTimer: 1000,
            placeholder: this._appTranslateService.get('i18n.features.simpsons.prueba'),
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
      buttons: createPatoControl({
        component: PatoButtonGroupComponent,
        formFieldComponent: FormFieldComponent,
        value: "",
        validators: [Validators.required],
        valueChangesSubscribe: true,
        args: {
          control: {
            items: this.simpsons,
            disabled: false,
            options: {
              label: (item: Simpson, index: number) => item.fullName,
              value: (item: any, index: number) => item,
              disabled: (item: any, index: number) => index === 3,
              selected: (item: any, index: number) => index === 4,
              variant: (item: any, index: number) => index === 0 ? "danger" : "info",
            }
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
    }
  };

  buildForm(form: FormGroup | null) {
    this.form.set(form);
  }

  onChangeControl(data: PatoDataFormChange) {
    console.log(data)
  }

  onSubmit(data: ResponsePatoForm) {
    this._simpsonId.update((value: number) => value + 1)
  }

  loadSimpsons() {
    this._simpsonsServices.getSimpsonsWithDelay(4).pipe(
      takeUntilDestroyed(this._destroyRef),
      tap((simpsons: Simpson[]) => {
        this._simpsons.set(simpsons);
      })).subscribe()
  }

  ngOnInit(): void {

  }
}
