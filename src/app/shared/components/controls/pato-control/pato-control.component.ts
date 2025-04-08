import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, computed, DestroyRef, forwardRef, inject, Injector, input, isSignal, OnInit, OutputEmitterRef, OutputRefSubscription, viewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, FormControlName, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { PatoFormComponent } from '../pato-form/pato-form.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { Args } from '@core/interfaces/args/args.interface';

@Component({
  selector: 'pato-control',
  templateUrl: './pato-control.component.html',
  styleUrl: './pato-control.component.css',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PatoControlComponent),
      multi: true
    }
  ]
})
export class PatoControlComponent implements OnInit, ControlValueAccessor {

  private readonly _injector = inject(Injector);

  private readonly _container = viewChild('container', { read: ViewContainerRef });

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _patoFormComponent = inject(PatoFormComponent);

  public formControlName = input.required<string>();

  private _componentRef!: ComponentRef<any>;

  private _componentRefFormField!: ComponentRef<any>;

  private readonly _componentInstance = computed<ControlValueAccessor>(() => this._componentRef?.instance )

  private readonly _id = computed(() => this._patoFormComponent.identifier() + '_' + this.formControlName())

  private readonly _form = computed(() => this._patoFormComponent.form())

  private readonly _data = computed(() => this._patoFormComponent.data().controls[this.formControlName()])

  private readonly _control = computed(() => this._form()?.controls[this.formControlName()]);



  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.createComponents();
    this.setInputsOutputs();
    this.setClasses();
  }

  private createComponents() {
    const { component, formFieldComponent } = this._data();
    const viewContainer = this._container();
    if (!formFieldComponent || !viewContainer) return;
    console.log(viewContainer)
    this._componentRefFormField = viewContainer.createComponent(formFieldComponent);
    this._componentRefFormField.setInput('control', this._control())
    this._componentRefFormField.setInput('id', this._id())
    const formFieldInstance = this._componentRefFormField.instance;
    this._componentRef = formFieldInstance.controlView().createComponent(component);
    console.log(this._componentRef)
    this._componentRef.setInput("formField", this._componentRefFormField.instance);
  }

  private setInputsOutputs() {
    const args = this._data().args;
    if (!args) return;
    const { control = {}, formField = {}} = args;
    const componentRef = this._componentRef;
    const componentRefFormField = this._componentRefFormField;
    const setInputsOutputs = (args: Partial<Args<any>>, componentRef: ComponentRef<any>) => {
      const keys = Object.keys(args);
      keys.forEach((argProperty: string) => {
        const argValue = args[argProperty];
        const componentProperty = componentRef.instance[argProperty];
        switch (typeof componentProperty) {
          case 'function':
            if (isSignal(argValue)) {
              const obs = toObservable(argValue, {
                injector: this._injector
              }).subscribe(() => componentRef.setInput(argProperty, argValue()))
              this._destroyRef.onDestroy(() => obs.unsubscribe());
            } else {
              componentRef.setInput(argProperty, argValue)
            }
            break;
          case 'object':
            if (!(componentProperty instanceof OutputEmitterRef)) return;
            const subs: OutputRefSubscription = componentProperty.subscribe(argValue)
            this._destroyRef.onDestroy(() => subs.unsubscribe())
        }
      });
    }
    setInputsOutputs(control, componentRef);
    setInputsOutputs(formField, componentRefFormField);
  }

  setClasses() {
    const classes = this._data().classes;
    if (!classes) return;
    const { control, formField } = classes;
    if (control) this._componentRef.location.nativeElement.classList = control;
    if (formField) this._componentRefFormField.location.nativeElement.classList = formField;
  }

  writeValue(obj: any): void {
    this._componentInstance().writeValue(obj);
  }

  registerOnChange(fn: any): void {
    this._componentInstance().registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this._componentInstance().registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this._componentInstance()?.setDisabledState?.(isDisabled);
  }

}
