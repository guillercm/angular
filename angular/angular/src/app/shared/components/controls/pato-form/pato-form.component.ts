import { AfterViewInit, Component, DestroyRef, effect, ElementRef, inject, input, OnInit, output, Renderer2, signal, Type, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormControlDirective, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatoDataForm } from './interfaces/pato-data-form.interface';
import { CommonModule } from '@angular/common';
import { PatoFormControlInjectorDirectiveDirective } from './directives/pato-form-control-injector-directive/pato-form-control-injector-directive.directive';
import { ResponsePatoForm } from './interfaces/pato-response-form.interface';
import { PatoDataFormChange } from './interfaces/pato-form-change.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { PatoInputComponent } from '../search-box/pato-input.component';







@Component({
  selector: 'pato-form',
  imports: [CommonModule, ReactiveFormsModule, PatoInputComponent, PatoFormControlInjectorDirectiveDirective],
  templateUrl: './pato-form.component.html',
  styleUrl: './pato-form.component.css'
})
export class PatoFormComponent implements OnInit {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _formBuilder = inject(FormBuilder);

  public data = input.required<PatoDataForm>();

  public formFieldComponent = input<Type<any>>();

  public onFormSubmit = output<ResponsePatoForm>();

  public onFormChange = output<PatoDataFormChange>();

  private _form = signal<FormGroup | null>(null);

  protected readonly form = this._form.asReadonly();

  protected formKeys: string[] = []

  ngOnInit(): void {
    // this.initialize();
  }

  private effectChangeForm = effect(() => {
    if (this.data()) this.initialize();
  })

  private initialize() {
    this.buildForm();
    this.initSubscriptionsForControlValueChanges();
  }

  private buildForm() {
    this.formKeys = Object.keys(this.data());
    const dataForm: any = {}
    let i = 0;
    this.formKeys.forEach((key: string) => {
      const dataControl = this.data()[key];
      dataForm[key] = [dataControl.value, [...dataControl.validators || []] ];
      i++;
    });
    this._form.set(this._formBuilder.group(dataForm))
  }

  private initSubscriptionsForControlValueChanges() {
    const form = this.form();
    if (!form) return;
    this.formKeys.forEach((key: string) => {
      form.get(key)?.patchValue('');
      if (!this.data()[key].valueChangesSubscribe) return;
      form.controls[key].valueChanges.pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this._destroyRef)
      ).subscribe(value => {
        this.onFormChange.emit({ filed: key, newValue: value })
      })
    });
  }

  protected onSubmit() {
    const form = this.form();
    form?.markAsTouched();
    if (!form || form.invalid) return;
    if (form.valid) this.onFormSubmit.emit(form.value);
  }

}


//   ref = inject(ViewContainerRef);

// renderer = inject(Renderer2)

// cargo(data: string) {
//   console.log(data)
//   console.log(this.markdownComponent().element.nativeElement.innerHTML)
//   const codeBlocks = this.markdownComponent().element.nativeElement.querySelectorAll('code-block');
//   codeBlocks.forEach((codeBlock: HTMLElement) => {
//     console.log(this.markdownComponent())
//     const comp = this.container().createComponent(CodeBlockComponent)
//     comp.setInput('code', "holaassa")
//     comp.setInput('type', codeBlock.getAttribute('type') || 'code')

//     const directive = new HighlightDirective(comp.location.nativeElement, this.renderer)
//     codeBlock.appendChild(comp.location.nativeElement)
//   });
// }
