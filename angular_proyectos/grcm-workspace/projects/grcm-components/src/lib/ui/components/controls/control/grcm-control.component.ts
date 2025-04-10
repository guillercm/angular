/* eslint-disable @typescript-eslint/no-explicit-any  */

import { CommonModule } from '@angular/common';
import { Component, ComponentRef, computed, DestroyRef, forwardRef, inject, Injector, input, isSignal, OnDestroy, OnInit, OutputEmitterRef, OutputRefSubscription, viewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { GrcmFormComponent } from '../form/grcm-form.component';
import { Args } from '../form/interfaces/args.interface';

@Component({
  selector: 'lib-grcm-control',
  templateUrl: './grcm-control.component.html',
  styleUrl: './grcm-control.component.css',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrcmControlComponent),
      multi: true
    }
  ],
  host: {
    '[attr.data-control-id]': 'id()'
  }
})
export class GrcmControlComponent implements OnInit, ControlValueAccessor, OnDestroy {

  private readonly _injector = inject(Injector);

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _container = viewChild('container', { read: ViewContainerRef });

  private readonly _grcmFormComponent = inject(GrcmFormComponent);

  public formControlName = input.required<string>();

  private _componentRef!: ComponentRef<any>;

  private _componentRefFormField!: ComponentRef<any>;

  private readonly _componentInstance = computed<ControlValueAccessor>(() => this._componentRef?.instance )

  public readonly id = computed(() => this._grcmFormComponent.identifier() + '_' + this.formControlName())

  private readonly _form = computed(() => this._grcmFormComponent.form())

  private readonly _data = computed(() => this._grcmFormComponent.data().controls[this.formControlName()])

  public readonly control = computed(() => this._form()?.controls[this.formControlName()]);


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
    this._componentRefFormField = viewContainer.createComponent(formFieldComponent);
    this._componentRefFormField.setInput('control', this.control())
    this._componentRefFormField.setInput('id', this.id())
    const formFieldInstance = this._componentRefFormField.instance;
    this._componentRef = formFieldInstance.controlView().createComponent(component);
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

  ngOnDestroy(): void {
    this._componentRef.destroy();
    this._componentRefFormField.destroy();
    this._container()?.clear();
  }

}
