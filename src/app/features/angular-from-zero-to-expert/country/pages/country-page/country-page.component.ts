import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Country } from '../../interfaces/country';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'features-countries-country-page',
  imports: [CommonModule],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export default class CountryPageComponent {

  private readonly _activatedRoute = inject(ActivatedRoute);

  private readonly _router = inject(Router);

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _countriesService = inject(CountriesService);

  private _country = signal<Country | null>(null);
  protected country = this._country.asReadonly();

  protected readonly getTranslations = computed(() => {
    const country = this.country();
    if (!country) return [];
    return Object.keys(country.translations)
  } )

  ngOnInit(): void {

    this._activatedRoute.params
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        switchMap( ({ id }) => this._countriesService.searchCountryByAlphaCode( id )),
      )
      .subscribe( country => {
        if ( !country ) return this._router.navigateByUrl('');
        return this._country.set(country);
      });
  }

}
