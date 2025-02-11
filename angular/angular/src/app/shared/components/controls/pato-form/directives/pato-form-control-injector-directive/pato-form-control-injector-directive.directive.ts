
import { AbstractControl, ControlValueAccessor, FormGroup, } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PatoFormComponentType } from '../../interfaces/pato-form-component-type.interface';
import { PatoFormFieldComponent } from '@shared/components/controls/pato-form-field/pato-form-field.component';
import { ComponentRef, DestroyRef, Directive, EnvironmentInjector, Host, Inject, inject, Injector, input, OnInit, Optional, Self, SkipSelf, Type, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[patoFormControlInjectorDirective]'
})
export class PatoFormControlInjectorDirectiveDirective implements OnInit {


  private readonly _viewContainerRef = inject(ViewContainerRef);

  public data = input.required<PatoFormComponentType<any>>();

  public control = input.required<AbstractControl<any>>();

  public name = input.required<string>();

  public form = input<FormGroup | null>(null);

  public componentFormField = input.required<Type<any>|undefined>();

  private _componentRef!: ComponentRef<any>;

  private _componentRefFormField!: ComponentRef<any>;

  private readonly _destroyRef = inject(DestroyRef);


  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.createComponents();
    this.setInputs();
    this.setFormControl();
  }

  createComponents() {
    const { component } = this.data();
    const componentFormField = this.componentFormField();
    if (!componentFormField) return;
    this._componentRefFormField = this._viewContainerRef.createComponent(componentFormField);
    this._componentRefFormField.setInput('control', this.control())

    const formFieldInstance = this._componentRefFormField.instance as PatoFormFieldComponent;
    this._componentRef = formFieldInstance.dynamicContent().createComponent(component);
  }

  setInputs() {
    const inputs = this.data().inputs;
    if (inputs) {
      const { control, formField } = inputs;
      const componentRef = this._componentRef;
      const componentRefFormField = this._componentRefFormField;
      if (control)
      Object.keys(control).forEach((inputKey: string) => {
        componentRef.setInput(inputKey, control[inputKey]);
      });
      if (formField)
      Object.keys(formField).forEach((inputKey: string) => {
        componentRefFormField.setInput(inputKey, (formField as any)[inputKey]);
      });

    }
  }

  setFormControl() {
    const control = this.control();
    const componentRef = this._componentRef;
    const { value } = this.data();
    const instance = componentRef.instance as ControlValueAccessor;

    componentRef.instance.formControl = control;

    instance.writeValue(value);
    control.setValue(value, { emitEvent: false });

    instance.registerOnChange((newValue:any) => {
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
      componentRef?.instance?.onChange(value);
    });

    control.statusChanges.pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe((value: any) => {
      control.markAsTouched();
      componentRef?.instance?.setDisabledState(value === 'DISABLED')
    })

    this.form()?.statusChanges.subscribe((value: string) => {
      console.log(value)
    })

  }

}
