import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { createPatoControl } from '@shared/components/controls/pato-form/utils/createPatoControl.function';
import { FormFieldComponent } from '@shared/components/controls/form-field/form-field.component';
import { FormGroup } from '@angular/forms';
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/data-form.interface';
import { PatoFormComponent } from '@shared/components/controls/pato-form/pato-form.component';
import { PatoInputComponent } from '@shared/components/controls/pato-input/pato-input.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SessionService } from '@core/services/session/session.service';
import { ResponsePatoForm } from '@shared/components/controls/pato-form/interfaces/pato-response-form.interface';

@Component({
  selector: 'features-countries-by-country-page',
  imports: [PatoFormComponent, CountryTableComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {
  private readonly _destroyRef = inject(DestroyRef);

  private readonly _countriesService = inject(CountriesService);

  private _countries = signal<Country[]>([]);
  public readonly countries = this._countries.asReadonly();

  protected form = signal<FormGroup | null>(null);

  private readonly _sessionService = inject(SessionService);

  protected dataForm: PatoDataForm = {
    form: {
      id: 'country'
    },
    controls: {
      query: createPatoControl({
        component: PatoInputComponent,
        formFieldComponent: FormFieldComponent,
        value: "",
        validators: [],
        args: {
          control: {
            placeholder: "Buscar por país",
            autocomplete: false,
            submitFormOnDebounce: true
          },
          formField: {
            label: "Por país",
          }
        },
        classes: {
          formField: "mt-3 col-12",
          control: "input-group"
        }
      })
    }

  }

  private searchCountry(query: string) {
    query = query.trim()
    if (!query) return;
    this._countriesService.searchCountry(query).pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe((value: Country[]) => {
      this._countries.set(value);
      if (value.length) this._sessionService.setItem("countryByCountry", query)
      else this._sessionService.removeItem("countryByCountry")
    });
  }

  buildForm(form: FormGroup | null) {
    this.form.set(form);
    const query = this._sessionService.getItem<string>("countryByCountry", "");
    this.searchCountry(query);
    form?.controls["query"].patchValue(query)
  }

  onSubmit({content}: ResponsePatoForm) {
    this.searchCountry(content['query']);
  }
}
