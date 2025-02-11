import { Component, inject } from '@angular/core';
import { Simpson } from '@features/simpsons/interfaces/simpson.interface';
import { SimpsonsService } from '@features/simpsons/services/simpsons.service';
import { take } from 'rxjs';
import { PatoFormComponent } from "@shared/components/controls/pato-form/pato-form.component";
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/pato-data-form.interface';
import { Validators } from '@angular/forms';
import { PatoInputComponent } from '@shared/components/controls/search-box/pato-input.component';
import { PatoFormComponentType } from '@shared/components/controls/pato-form/interfaces/pato-form-component-type.interface';
import { PatoDataFormChange } from '@shared/components/controls/pato-form/interfaces/pato-form-change.interface';
import { PatoFormFieldComponent } from '@shared/components/controls/pato-form-field/pato-form-field.component';

@Component({
  selector: 'features-simpsons',
  imports: [PatoFormComponent],
  templateUrl: './simpsons.component.html',
  styleUrl: './simpsons.component.css'
})
export default class SimpsonsComponent {
  private readonly _simpsonsServices = inject(SimpsonsService);

  protected formFieldComponent = PatoFormFieldComponent

  protected dataForm: PatoDataForm = {
    fullName: {
      component: PatoInputComponent,
      value: "",
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(6)],
      inputs: {
        control: {
          debounceTimer: 0,
          placeholder: "nombre"
        },
        formField: {
          label: "Nombre completo"
        }
      }
    } as PatoFormComponentType<PatoInputComponent>,
    personality: {
      component: PatoInputComponent,
      value: "",
      valueChangesSubscribe: true,
      inputs: {
        control: {
          debounceTimer: 0,
          placeholder: "personalidad"
        },
        formField: {
          label: "Personalidad"
        }
      }
    } as PatoFormComponentType<PatoInputComponent>
  }

  onChangeControl(data: PatoDataFormChange) {
    console.log(data)
  }

  onSubmit(data: any) {
    console.log(data);
  }


  ngOnInit(): void {
    this._simpsonsServices.getSimpsonById(1).pipe(take(1)).subscribe((simpson: Simpson) => {
      console.log(simpson)
    })
    this._simpsonsServices.getSimpsons().pipe(take(1)).subscribe((simpsons: Simpson[]) => {
      console.log(simpsons)
    })
  }
}
