import { ComponentRef, computed, DestroyRef, Directive, inject, input, OnInit, OutputEmitterRef, OutputRefSubscription, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { PatoFormComponent } from '../../pato-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Args } from '@core/interfaces/args/args.interface';
import { Subscription } from 'rxjs';


@Directive({
  selector: '[patoFormControlInjectorDirective]'
})
export class PatoFormControlInjectorDirectiveDirective implements OnInit {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _viewContainerRef = inject(ViewContainerRef);

  private readonly _patoFormComponent = inject(PatoFormComponent);

  public key = input.required<string>();

  private _componentRef!: ComponentRef<any>;

  private _componentRefFormField!: ComponentRef<any>;

  private readonly _id = computed(() => this._patoFormComponent.identifier() + '_' + this.key())

  private readonly _form = computed(() => this._patoFormComponent.form())

  private readonly _data = computed(() => this._patoFormComponent.data()[this.key()])

  private readonly _control = computed(() => this._form()?.controls[this.key()]);


  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.createComponents();
    this.setInputsOutputs();
    this.setClasses();
    this.setFormControl();
  }

  createComponents() {
    const { component, formFieldComponent } = this._data();
    if (!formFieldComponent) return;
    this._componentRefFormField = this._viewContainerRef.createComponent(formFieldComponent);
    this._componentRefFormField.setInput('control', this._control())
    this._componentRefFormField.setInput('id', this._id())

    // this._componentRefFormField.instance.controlEvent.subscribe((event: string) => {
    //   //console.log('Evento capturado en el componente padre:', event);
    // });

    const formFieldInstance = this._componentRefFormField.instance;
    this._componentRef = formFieldInstance.controlView().createComponent(component);
    this._componentRef.setInput("formField", this._componentRefFormField.instance)
  }

  setInputsOutputs() {
    const args = this._data().args;
    if (args) {
      const { control, formField } = args;
      const componentRef = this._componentRef;
      const componentRefFormField = this._componentRefFormField;
      // //console.log(this._componentRefFormField.instance.outputPrueba.subscribe((event: string) => {
      //   //console.log(event)
      // }))
      const setInputsOutputs = (component: Partial<Args<any>> | undefined, componentRef: ComponentRef<any>) => {
        if (component)
          Object.keys(component).forEach((inputKey: string) => {
            const property = componentRef.instance[inputKey];
            if (typeof property === 'function') {
              const nameFunction: string = property.name;
              if (nameFunction.includes("input")) {
                componentRef.setInput(inputKey, component[inputKey]);
              }
            } else if (typeof property === 'object' && property instanceof OutputEmitterRef) {
              const subs: OutputRefSubscription = componentRef.instance[inputKey].subscribe(component[inputKey])
              this._destroyRef.onDestroy(() => subs.unsubscribe() )
            }
          });
      }
      setInputsOutputs(control, componentRef);
      setInputsOutputs(formField, componentRefFormField);
    }
  }

  setClasses() {
    const classes = this._data().classes;
    if (!classes) return;
    const { control, formField } = classes;
    if (control) this._componentRef.location.nativeElement.classList = control;
    if (formField) this._componentRefFormField.location.nativeElement.classList = formField;
  }

  setFormControl() {
    const control = this._control();
    if (!control) return;

    const componentRef = this._componentRef;
    const { value } = this._data();
    const instance = componentRef.instance as ControlValueAccessor;

    componentRef.instance.formControl = control;

    instance.writeValue(value);
    control.setValue(value, { emitEvent: false });

    instance.registerOnChange((newValue: any) => {
      if (control.value === newValue) return;
      control.setValue(newValue, { emitEvent: false });
      control.markAsDirty();

      if (control.updateOn === 'change') {
        control.updateValueAndValidity();
      }
    });

    instance.registerOnTouched(() => {
      const { updateOn } = control;
      if (updateOn !== 'submit') {
        control.markAsTouched();
      }
      if (updateOn === 'blur' || updateOn === 'change') {
        control.markAsDirty();
        control.updateValueAndValidity();
      }
    })

    control.valueChanges.pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe((value: any) => {
      // componentRef?.instance?.onChange(value);
      instance.writeValue(value);
    });

    control.statusChanges.pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe((value: any) => {
      control.markAsTouched();
      componentRef?.instance?.setDisabledState(value === 'DISABLED')
    })

    // const form = this.patoFormComponent.form();
    // this.form()?.statusChanges.subscribe((value: string) => {
    //   //console.log(value)
    // })

  }

}
