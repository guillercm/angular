import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';


import { FormErrorLabelComponent } from '../../../../shared/components/form-error-label/form-error-label.component';
import { Router } from '@angular/router';
import { ProductCarouselComponent } from '../../../../products/components/product-carousel/product-carousel.component';
import { Product } from '../../../../products/interfaces/product.interface';
import { ProductsService } from '../../../../products/services/products.service';
import { FormUtils } from '../../../../utils/form-utils';
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
import { AppTranslatePipe } from "../../../../../../../../core/pipes/app-translate.pipe";

@Component({
  selector: 'product-details',
  imports: [
    ProductCarouselComponent,
    ReactiveFormsModule,
    FormErrorLabelComponent,
    PatoFormComponent,
    SharedButtonComponent,
    AppTranslatePipe
],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {

  private readonly _appTranslateService = inject(AppTranslateService);

  product = input.required<Product>();

  router = inject(Router);
  fb = inject(FormBuilder);

  productsService = inject(ProductsService);
  wasSaved = signal(false);

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
            },
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
              label: "value"
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
      })
    }
  };

  /*
   title: ['', Validators.required],
    description: ['', Validators.required],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: [
      'men',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
    ],
  */

  submit(data: ResponsePatoForm) {
    console.log(data.content)
  }

  buildForm(form: FormGroup | null) {
    if (!form) return;
    form.reset(this.product() as any);
    console.log(this.product().sizes)
    form.patchValue({ tags: this.product().tags?.join(',') });
  }

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: [
      'men',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
    ],
  });

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(this.product() as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',') });
    // this.productForm.patchValue(formLike as any);
  }

  onSizeClicked(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes });
  }

  async onSubmitOld() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if (!isValid) return;
    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags:
        formValue.tags
          ?.toLowerCase()
          .split(',')
          .map((tag) => tag.trim()) ?? [],
    };

    if (this.product().id === 'new') {
      // Crear producto
      const product = await firstValueFrom(
        this.productsService.createProduct(productLike, this.imageFileList)
      );

      this.router.navigate(['/admin/products', product.id]);
    } else {
      await firstValueFrom(
        this.productsService.updateProduct(
          this.product().id,
          productLike,
          this.imageFileList
        )
      );
    }

    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }

  // Images
  onFilesChanged(event: Event) {
    const fileList = (event.target as HTMLInputElement).files;
    this.imageFileList = fileList ?? undefined;

    const imageUrls = Array.from(fileList ?? []).map((file) =>
      URL.createObjectURL(file)
    );

    this.tempImages.set(imageUrls);
  }
}
