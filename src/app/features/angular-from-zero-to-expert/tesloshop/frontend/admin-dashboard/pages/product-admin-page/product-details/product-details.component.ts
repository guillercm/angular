import {
  Component,
  computed,
  inject,
  input, signal
} from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';


import { ActivatedRoute, Router } from '@angular/router';
import { ProductCarouselComponent } from '../../../../products/components/product-carousel/product-carousel.component';
import { Product } from '../../../../products/interfaces/product.interface';
import { ProductsService } from '../../../../products/services/products.service';
import { createPatoControl } from '@shared/components/controls/pato-form/utils/createPatoControl.function';
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/data-form.interface';
import { FormFieldComponent } from '@shared/components/controls/form-field/form-field.component';
import { PatoInputComponent } from '@shared/components/controls/pato-input/pato-input.component';
import { PatoTextareaComponent } from '@shared/components/controls/pato-textarea/pato-textarea.component';
import { PatoFormComponent } from '@shared/components/controls/pato-form/pato-form.component';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';
import { ResponsePatoForm } from '@shared/components/controls/pato-form/interfaces/pato-response-form.interface';
import { PatoInputNumberComponent } from '@shared/components/controls/pato-input-number/pato-input-number.component';
import { PatoButtonGroupComponent } from '@shared/components/controls/pato-button-group/pato-button-group.component';
import { PatoDefaultOptionsButtonGroup } from '@shared/components/controls/pato-button-group/interfaces/default-options-button-group.interface';
import { PlainFormFieldComponent } from '@shared/components/controls/plain-form-field/plain-form-field.component';
import { AppTranslateService } from '@core/services/translate/app-translate.service';
import { AppTranslatePipe } from "@core/pipes/app-translate.pipe";
import { FormUtils } from '../../../../../../../../utils/form-utils';
import { PatoInputFileComponent } from '@shared/components/controls/pato-input-file/pato-input-file.component';
import { InterceptorService } from '@core/interceptors/services/interceptor.service';
import { AnimationEndDirective } from '@shared/directives/animationEnd/animation-end.directive';

@Component({
  selector: 'product-details',
  imports: [
    ProductCarouselComponent,
    ReactiveFormsModule,
    PatoFormComponent,
    SharedButtonComponent,
    AppTranslatePipe,
    AnimationEndDirective
  ],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {

  private readonly _appTranslateService = inject(AppTranslateService);

  private readonly _interceptorService = inject(InterceptorService);

  private readonly _activatedRoute = inject(ActivatedRoute);

  protected productsRequest = computed(() => this._interceptorService.getHttpRequestById("productsReq"))

  protected form = signal<FormGroup | null>(null);

  product = input.required<Product>();

  router = inject(Router);

  productsService = inject(ProductsService);

  imageFileList: FileList | undefined = undefined;
  tempImages = signal<string[]>([]);

  imagesToCarousel = computed(() => {
    const currentProductImages = [
      ...this.product().images,
      ...this.tempImages(),
    ];
    return currentProductImages;
  });

  protected dataForm: PatoDataForm = {
    form: {
      id: 'form-product-details',
    },
    controls: {
      title: createPatoControl({
        component: PatoInputComponent,
        formFieldComponent: FormFieldComponent,
        value: "",
        validators: [Validators.required],
        args: {
          formField: {
            label: this._appTranslateService.get('i18n.common.title')
          }
        },
        classes: {
          formField: "col-12",
          control: "input-group"
        }
      }),
      slug: createPatoControl({
        component: PatoInputComponent,
        formFieldComponent: FormFieldComponent,
        value: "",
        validators: [Validators.required, Validators.pattern(FormUtils.slugPattern)],
        args: {
          formField: {
            label: this._appTranslateService.get('i18n.common.title')
          }
        },
        classes: {
          formField: "col-12",
          control: "input-group"
        }
      }),
      description: createPatoControl({
        component: PatoTextareaComponent,
        formFieldComponent: FormFieldComponent,
        value: "",
        validators: [Validators.required],
        asyncValidators: [],
        valueChangesSubscribe: true,
        args: {
          control: {
            rows: 6
          },
          formField: {
            "label": this._appTranslateService.get('i18n.common.description')
          }
        },
        classes: {
          formField: "mt-3 col-6 mt-4",
          control: "input-group"
        }
      }),
      price: createPatoControl({
        component: PatoInputNumberComponent,
        formFieldComponent: FormFieldComponent,
        value: 0,
        validators: [Validators.required, Validators.min(0)],
        asyncValidators: [],
        valueChangesSubscribe: true,
        args: {
          control: {

          },
          formField: {
            "label": this._appTranslateService.get('i18n.common.price')
          }
        },
        classes: {
          formField: "mt-3 col-6 mt-4",
          control: "input-group"
        }
      }),
      stock: createPatoControl({
        component: PatoInputNumberComponent,
        formFieldComponent: FormFieldComponent,
        value: 2,
        validators: [Validators.required, Validators.min(0)],
        asyncValidators: [],
        valueChangesSubscribe: true,
        args: {
          control: {

          },
          formField: {
            "label": this._appTranslateService.get('i18n.common.stock')
          }
        },
        classes: {
          formField: "mt-3 col-6 mt-4",
          control: "input-group"
        }
      }),
      tags: createPatoControl({
        component: PatoInputComponent,
        formFieldComponent: FormFieldComponent,
        value: 0,
        validators: [],
        asyncValidators: [],
        args: {
          control: {

          },
          formField: {
            "label": this._appTranslateService.get('i18n.common.tags')
          }
        },
        classes: {
          formField: "mt-3 col-6 mt-4",
          control: "input-group"
        }
      }),
      gender: createPatoControl({
        component: PatoButtonGroupComponent,
        formFieldComponent: FormFieldComponent,
        value: 0,
        validators: [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
        asyncValidators: [],
        args: {
          control: {
            options: {
              value: "value",
              selected: (item: any) => {
                return this.product().gender.includes(item.value)
              },
            },
            maxSelectableElements: 1,
            returnType: 'obj',
            items: [
              {
                label: this._appTranslateService.get('i18n.common.male'),
                value: "men"
              },
              {
                label: this._appTranslateService.get('i18n.common.female'),
                value: "women"
              },
              {
                label: this._appTranslateService.get('i18n.common.children'),
                value: "kid"
              },
              {
                label: this._appTranslateService.get('i18n.common.unisex'),
                value: "unisex"
              }
            ] as PatoDefaultOptionsButtonGroup[]
          },
          formField: {
          }
        },
        classes: {
          formField: "mt-3 col-6 mt-4",
          control: "input-group"
        }
      }),
      sizes: createPatoControl({
        component: PatoButtonGroupComponent,
        formFieldComponent: PlainFormFieldComponent,
        value: 0,
        validators: [],
        asyncValidators: [],
        args: {
          control: {
            options: {
              value: "value",
              label: "value",
              selected: (item: any, index: number) => {
                return this.product().sizes.includes(item.value)
              }
            },
            items: [
              {
                value: "XS"
              },
              {
                value: "S"
              },
              {
                value: "M"
              },
              {
                value: "L"
              },
              {
                value: "XL"
              },
              {
                value: "XXL"
              }
            ] as PatoDefaultOptionsButtonGroup[]
          },
          formField: {
          }
        },
        classes: {
          formField: "mt-3 col-6 mt-4",
          control: "input-group"
        }
      }),
      images: createPatoControl({
        component: PatoInputFileComponent,
        formFieldComponent: FormFieldComponent,
        value: '',
        validators: [],
        asyncValidators: [],
        args: {
          control: {
            // change: this.onFilesChanged,
            change: (event: Event) => {
              console.log(event)

              const fileList = (event.target as HTMLInputElement).files;
              this.imageFileList = fileList ?? undefined;

              const imageUrls = Array.from(fileList ?? []).map((file) =>
                URL.createObjectURL(file)
              );

              this.tempImages.set(imageUrls);
            }
          },
          formField: {
          }
        },
        classes: {
          formField: "mt-3 col-6 mt-4",
          control: "input-group"
        }
      })
    }
  };

  async submit(data: ResponsePatoForm) {
    console.log(data.content)
    const form = this.form();
    if (!form) return;

    const formValue = data.content;

    const images = this.product().images ?? [];
    const productLike: Partial<Product> = {
      ...(formValue as any),
      images: [...images],
      tags:
        formValue['tags']
          ?.toLowerCase()
          .split(',')
          .map((tag: string) => tag.trim()) ?? [],
    };
    console.log(productLike)
    if (this.product().id === 'new') {
      const product = await firstValueFrom(
        this.productsService.createProduct(productLike, this.imageFileList)
      );
      this.router.navigate(['../'], {relativeTo: this._activatedRoute});
    } else {
      await firstValueFrom(
        this.productsService.updateProduct(
          this.product().id,
          productLike,
          this.imageFileList
        )
      );
    }
  }

  buildForm(form: FormGroup | null) {
    if (!form) return;
    this.form.set(form);
    form.reset(this.product() as any);
    form.patchValue({ tags: this.product().tags?.join(',') });
  }

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

}
