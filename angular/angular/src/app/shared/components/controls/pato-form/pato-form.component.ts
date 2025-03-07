import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, effect, inject, input, output, signal, TemplateRef, Type } from '@angular/core';
import { distinctUntilChanged } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PatoDataForm } from './interfaces/pato-data-form.interface';
import { PatoDataFormChange } from './interfaces/pato-form-change.interface';
import { PatoFormControlInjectorDirectiveDirective } from './directives/pato-form-control-injector-directive/pato-form-control-injector-directive.directive';
import { ResponsePatoForm } from './interfaces/pato-response-form.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';



@Component({
  selector: 'pato-form',
  imports: [CommonModule, ReactiveFormsModule, PatoFormControlInjectorDirectiveDirective],
  templateUrl: './pato-form.component.html',
  styleUrl: './pato-form.component.css'
})
export class PatoFormComponent implements AfterViewInit {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _formBuilder = inject(FormBuilder);

  public data = input.required<PatoDataForm>();

  public identifier = input.required<string>();

  public additionalClasses = input<string>();

  public onbuildForm = output<FormGroup|null>();

  public onFormSubmit = output<ResponsePatoForm>();

  public onFormChange = output<PatoDataFormChange>();

  private _form = signal<FormGroup | null>(null);

  public readonly form = this._form.asReadonly();

  protected formKeys: string[] = []

  public readonly finalFormTemplate = input<TemplateRef<any>|null>(null);


  private effectChangeForm = effect(() => {
    if (this.data()) this.initialize();
  })

  private initialize() {
    this.initFormKeys();
    this.buildForm();
    this.initSubscriptionsForControlValueChanges();
    // this.initFormTouchedEvents();
  }

  private initFormKeys() {
    this.formKeys = Object.keys(this.data());
  }

  private buildForm() {
    const dataForm: any = {}
    let i = 0;
    this.formKeys.forEach((key: string) => {
      const dataControl = this.data()[key];
      dataForm[key] = [dataControl.value, [...dataControl.validators || []] ];
      i++;
    });
    this._form.set(this._formBuilder.group(dataForm));
  }

  ngAfterViewInit(): void {
    this.onbuildForm.emit(this.form());
  }

  private initSubscriptionsForControlValueChanges() {
    const form = this.form();
    if (!form) return;
    this.formKeys.forEach((key: string) => {
      if (!this.data()[key].valueChangesSubscribe) return;
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
    if (!form || form.invalid) return;
    if (form.valid) this.onFormSubmit.emit(form.value);
  }

  private markAsTouched(touched: boolean = true) {
    const form = this.form();
    this.formKeys.forEach((key: string) => {
      if (touched) {
        form?.controls[key].markAllAsTouched();
      } else {
        form?.controls[key].markAsUntouched();
      }
    });
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
