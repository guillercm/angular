import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { CountryTableComponent } from "../../components/country-table/country-table.component";
import { createPatoControl } from '@shared/components/controls/pato-form/utils/createPatoControl.function';
import { FormFieldComponent } from '@shared/components/controls/form-field/form-field.component';
import { FormGroup } from '@angular/forms';
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/data-form.interface';
import { PatoFormComponent } from "@shared/components/controls/pato-form/pato-form.component";
import { PatoInputComponent } from '@shared/components/controls/pato-input/pato-input.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SessionService } from '@core/services/session/session.service';
import { ResponsePatoForm } from '@shared/components/controls/pato-form/interfaces/pato-response-form.interface';

@Component({
  selector: 'features-countries-by-capital-page',
  imports: [PatoFormComponent, CountryTableComponent],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export default class ByCapitalPageComponent {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _countriesService = inject(CountriesService);

  private _countries = signal<Country[]>([]);
  public readonly countries = this._countries.asReadonly();

  protected form = signal<FormGroup | null>(null);

  private readonly _sessionService = inject(SessionService);

  protected dataForm: PatoDataForm = {
    form: {
      id: 'capital'
    },
    controls: {
      query: createPatoControl({
        component: PatoInputComponent,
        formFieldComponent: FormFieldComponent,
        value: "",
        validators: [],
        args: {
          control: {
            placeholder: "Buscar por capital",
            autocomplete: false,
            submitFormOnDebounce: true
          },
          formField: {
            label: "Por capital",
          }
        },
        classes: {
          formField: "mt-3 col-12",
          control: "input-group"
        }
      })
    }

  }

  private searchCapital(query: string) {
    query = query.trim()
    if (!query) return;
    this._countriesService.searchCapital(query).pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe((value: Country[]) => {
      this._countries.set(value);
      if (value.length) this._sessionService.setItem("countryByCapital", query)
      else this._sessionService.removeItem("countryByCapital")
    });
  }

  buildForm(form: FormGroup | null) {
    this.form.set(form);
    const query = this._sessionService.getItem<string>("countryByCapital", "");
    this.searchCapital(query);
    form?.controls["query"].patchValue(query)
  }
  
  onSubmit({content}: ResponsePatoForm) {
    this.searchCapital(content['query']);
  }
}
