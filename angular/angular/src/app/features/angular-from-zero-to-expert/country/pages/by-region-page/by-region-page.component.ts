import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Region } from '../../interfaces/region.type';
import { CommonModule } from '@angular/common';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedButtonComponent } from "../../../../../shared/components/button/shared-button.component";
import { SessionService } from '@core/services/session/session.service';

@Component({
  selector: 'features-countries-by-region-page',
  imports: [CommonModule, CountryTableComponent, SharedButtonComponent],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export default class ByRegionPageComponent implements OnInit {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _sessionService = inject(SessionService);

  private readonly _countriesService = inject(CountriesService);

  protected readonly regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion = signal<Region>('Europe');

  private _countries = signal<Country[]>([]);
  public readonly countries = this._countries.asReadonly();

  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    const region = this._sessionService.getItem<Region>("countryByRegion", "Europe");
    this.searchByRegion(region);
  }

  searchByRegion(region: Region) {
    this.selectedRegion.set(region);
    this._sessionService.setItem("countryByRegion", region);
    this._countriesService.searchRegion(region).pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe((value: Country[]) => {
      this._countries.set(value);
    });
  }
}
