import { AfterViewInit, Component, computed, DestroyRef, effect, inject, input, output, signal, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PatoControlComponent } from '../pato-control/pato-control.component';
import { PatoDataForm } from './interfaces/data-form.interface';
import { PatoDataFormChange } from './interfaces/pato-form-change.interface';
import { ResponsePatoForm } from './interfaces/pato-response-form.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'pato-form',
  imports: [CommonModule, ReactiveFormsModule, PatoControlComponent],
  templateUrl: './pato-form.component.html',
  styleUrl: './pato-form.component.css'
})
export class PatoFormComponent implements AfterViewInit {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _formBuilder = inject(FormBuilder);

  public data = input.required<PatoDataForm>();

  public additionalClasses = input<string>();

  public buildForm = output<FormGroup|null>();

  public onFormSubmit = output<ResponsePatoForm>();

  public onFormChange = output<PatoDataFormChange>();

  private _form = signal<FormGroup | null>(null);

  public readonly form = this._form.asReadonly();

  protected formKeys: string[] = []

  public readonly finalFormTemplate = input<TemplateRef<any>|null>(null);

  public readonly identifier = computed(() => this.data().form.id );

  private effectChangeForm = effect(() => {
    if (this.data()) this.initialize();
  })

  private initialize() {
    this.initFormKeys();
    this.initForm();
    this.initSubscriptionsForControlValueChanges();
  }

  private initFormKeys() {
    this.formKeys = Object.keys(this.data().controls);
  }

  private initForm() {
    const dataForm: any = {}
    const data = this.data();
    this.formKeys.map((key: string, index: number) => {
      const dataControl = data.controls[key];
      dataForm[key] = [dataControl.value, [...dataControl.validators || []], [...dataControl.asyncValidators || []] ];
    })
    this._form.set(this._formBuilder.group(dataForm, {
      validators: data.form.validators,
      asyncValidators: data.form.asyncValidators,
      updateOn: data.form.updateOn || 'change'
    }));
  }

  ngAfterViewInit(): void {
    this.buildForm.emit(this.form());
  }

  private initSubscriptionsForControlValueChanges() {
    const form = this.form();
    if (!form) return;
    this.formKeys.forEach((key: string) => {
      if (!this.data().controls[key].valueChangesSubscribe) return;
      form.controls[key].valueChanges.pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this._destroyRef)
      ).subscribe((value: any) => {
        this.onFormChange.emit({ field: key, newValue: value })
      })
    });
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
    console.log(form?.value)
    if (!form || form.invalid) return;
    if (form.valid) this.onFormSubmit.emit({
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
