import { inject, Injectable, signal } from '@angular/core';
import { Api } from '@core/interfaces/config/config';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { Country } from '../interfaces/country';
import { asyncScheduler, catchError, map, Observable, of, scheduled, tap } from 'rxjs';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

private readonly _apiHandler = inject(ApiHandlerService);

  private readonly _configService = inject(AppConfigService);

  private _configApi = signal<Api|null>(null);

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._configApi.set(this._configService.config().apis["countries"]);
  }

  private getEndpoint(endpoint: string): string {
    const configApi = this._configApi();
    if (!configApi) return "";
    return `${configApi.baseUrl}${configApi.endpoints[endpoint]}`;
  }

  public searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = this.getEndpoint("searchCountryByAlphaCode");
    return this._apiHandler.get<Country[]>( url, {pathParams: {code}} )
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null ),
        catchError( (e) => of(null) ),
      );
  }

  searchCapital(capital:string): Observable<Country[]> {
    const url = this.getEndpoint("searchCapital");
    return this._apiHandler.get<Country[]>(url, {pathParams: {capital}})
        .pipe(
          catchError( (e) => of([]) ),
        );
  }

  searchCountry(country: string): Observable<Country[]> {
    const url = this.getEndpoint("searchCountry");
    return this._apiHandler.get<Country[]>(url, {pathParams: {country}})
      .pipe(
        catchError( (e) => of([]) ),
      );
  }

  searchRegion(region: Region ): Observable<Country[]> {
    const url = this.getEndpoint("searchRegion");
    return this._apiHandler.get<Country[]>(url, {pathParams: {region}})
      .pipe(
        catchError( (e) => of([]) ),
      );
  }


}
