/* eslint-disable @typescript-eslint/no-explicit-any */

import { AfterViewInit, Component, computed, DestroyRef, inject, input, OnInit, output, signal, TemplateRef, viewChildren, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { GrcmDataForm } from './interfaces/data-form.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GrcmControlComponent } from '../control/grcm-control.component';
import { ResponseGrcmForm } from './interfaces/response-form.interface';
import { GrcmDataFormChange } from './interfaces/form-change.interface';
import { GenericObject } from './interfaces/generic-object.interface';
import { GrcmFormComponentType } from './interfaces/form-component-type.interface';


@Component({
  selector: 'lib-grcm-form',
  imports: [CommonModule, ReactiveFormsModule, GrcmControlComponent],
  templateUrl: './grcm-form.component.html',
  styleUrl: './grcm-form.component.css'
})
export class GrcmFormComponent implements OnInit, AfterViewInit {

  public grcmControls = viewChildren(GrcmControlComponent, { read: ViewContainerRef });

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _formBuilder = inject(FormBuilder);

  public data = input.required<GrcmDataForm>();

  public additionalClasses = input<string>();

  public buildForm = output<FormGroup|null>();

  public formSubmit = output<ResponseGrcmForm>();

  public formChange = output<GrcmDataFormChange>();

  private _form = signal<FormGroup | null>(null);

  public readonly form = this._form.asReadonly();

  protected formKeys: string[] = []

  public readonly templates = input<GenericObject<TemplateRef<any>>>({});

  public readonly identifier = computed(() => this.data().form.id );

  public readonly formControlNames = computed(() => Object.keys(this._form()?.controls || {}))

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit(): void {
    this.buildForm.emit(this.form());
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

  addControl(name: string, control: GrcmFormComponentType<any, any>) {
    this._form()?.addControl(name, this._formBuilder.control(control.value, [...control.validators || []], [...control.asyncValidators || []]));
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

  public onSubmit() {
    const form = this.form();
    this.markAsTouched();
    if (!form || form.invalid) return;
    if (form.valid) this.formSubmit.emit({form});
  }

  private markAsTouched() {
    const form = this.form();
    form?.markAsTouched();
    form?.updateValueAndValidity();
  }

  protected getDataForTemplateContext(formControlName: string | null = null) {
    const form = this.form();
    if (!form) return {};
    const data: GenericObject = {
      form
    };
    if (formControlName) {
      data['control'] = form.controls[formControlName];
    }
    return data;
  }

}
