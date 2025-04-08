import { AfterViewInit, Component, computed, DestroyRef, inject, input, OnInit, output, signal, TemplateRef, viewChild, viewChildren, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { PatoControlComponent } from '../pato-control/pato-control.component';
import { PatoDataForm } from './interfaces/data-form.interface';
import { PatoDataFormChange } from './interfaces/pato-form-change.interface';
import { ResponsePatoForm } from './interfaces/pato-response-form.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppTranslatePipe } from "@core/pipes/app-translate.pipe";
import { PatoFormComponentType } from './interfaces/pato-form-component-type.interface';
import { GenericObject } from '../../../../core/interfaces/generic-object/generic-object.interface';


@Component({
  selector: 'pato-form',
  imports: [CommonModule, ReactiveFormsModule, PatoControlComponent, AppTranslatePipe],
  templateUrl: './pato-form.component.html',
  styleUrl: './pato-form.component.css'
})
export class PatoFormComponent implements OnInit, AfterViewInit {

  public patoControls = viewChildren(PatoControlComponent, { read: ViewContainerRef });

  private readonly _container = viewChild('container', { read: ViewContainerRef });

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _formBuilder = inject(FormBuilder);

  public data = input.required<PatoDataForm>();

  public additionalClasses = input<string>();

  public buildForm = output<FormGroup|null>();

  public formSubmit = output<ResponsePatoForm>();

  public formChange = output<PatoDataFormChange>();

  private _form = signal<FormGroup | null>(null);

  public readonly form = this._form.asReadonly();

  protected formKeys: string[] = []

  public readonly templates = input<GenericObject<TemplateRef<any>>>({});

  public readonly identifier = computed(() => this.data().form.id );

  public readonly formControlNames = computed(() => Object.keys(this._form()?.controls || {}))

  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    this.initForm();
    this.initSubscriptionsForControlValueChanges();
  }


  private initForm() {
    const data = this.data();
    this._form.set(this._formBuilder.record({}, {
      validators: data.form.validators,
      asyncValidators: data.form.asyncValidators,
      updateOn: data.form.updateOn || 'change'
    }));

    Object.keys(data.controls).forEach((name) => {
      const dataControl = data.controls[name];
      this.addControl(name, dataControl);
    });
  }

  addControl(name: string, control: PatoFormComponentType<any, any>) {
    this._form()?.addControl(name, this._formBuilder.control(control.value, [...control.validators || []], [...control.asyncValidators || []]));
  }

  ngAfterViewInit(): void {
    // const data = this.data();
    // this.formControlNames().map((controlName) => {
    //   this.createForm(controlName, data.controls[controlName]);
    // })
    this.buildForm.emit(this.form());
  }

  createForm(controlName: string, data: PatoFormComponentType<any, any>) {
    const viewContainer = this._container();
    if (!viewContainer) return;
    this.patoControls().map((patoControl) => {
      const control = this._form()?.controls[controlName];
      const formField = viewContainer.createComponent(data.formFieldComponent)
      formField.setInput('control', control)
      formField.setInput('id', this.identifier() + '_' + controlName)
    })
  }

  private initSubscriptionsForControlValueChanges() {
    const form = this.form();
    if (!form) return;
    this.formControlNames().forEach((key: string) => {
      if (!this.data().controls[key].valueChangesSubscribe) return;
      form.controls[key].valueChanges.pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this._destroyRef)
      ).subscribe((value: any) => {
        this.formChange.emit({ field: key, newValue: value })
      })
    });
  }

  getErrors(errors: ValidationErrors | null) {
    if (!errors) return [];
    return Object.keys(errors);
  }

  // private initFormTouchedEvents() {
  //   this.form()?.events.pipe(
  //     takeUntilDestroyed(this._destroyRef)
  //   ).subscribe((event: ControlEvent<any>) => {
  //     if (event instanceof TouchedChangeEvent && event.source instanceof FormGroup){
  //       //console.log(event)
  //         this.markAsTouched(event.touched)
  //     }
  //   })
  // }

  public onSubmit() {
    const form = this.form();
    this.markAsTouched();
    if (!form || form.invalid) return;
    if (form.valid) this.formSubmit.emit({
      valid: form.valid,
      content: form.value
    });
  }

  private markAsTouched(touched: boolean = true) {
    const form = this.form();
    form?.markAsTouched();
    form?.updateValueAndValidity();
  }

}


//   ref = inject(ViewContainerRef);

// renderer = inject(Renderer2)

// cargo(data: string) {
//   //console.log(data)
//   //console.log(this.markdownComponent().element.nativeElement.innerHTML)
//   const codeBlocks = this.markdownComponent().element.nativeElement.querySelectorAll('code-block');
//   codeBlocks.forEach((codeBlock: HTMLElement) => {
//     //console.log(this.markdownComponent())
//     const comp = this.container().createComponent(CodeBlockComponent)
//     comp.setInput('code', "holaassa")
//     comp.setInput('type', codeBlock.getAttribute('type') || 'code')

//     const directive = new HighlightDirective(comp.location.nativeElement, this.renderer)
//     codeBlock.appendChild(comp.location.nativeElement)
//   });
// }
