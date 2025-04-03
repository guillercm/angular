import { Api } from '@core/interfaces/config/config';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';
import { inject, Injectable, signal } from '@angular/core';
import { Region } from '../interfaces/region.type';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly _apiHandlerService = inject(ApiHandlerService);

  private readonly _configService = inject(AppConfigService);

  private _configApi = signal<Api | null>(null);

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._configApi.set(this._configService.config().apis["countries"]);
  }

  private getEndpoint(endpoint: string): string {
    return this._apiHandlerService.getEndpoint(this._configApi, endpoint)
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = this.getEndpoint("searchCountryByAlphaCode");
    return this._apiHandlerService.get<Country[]>(url, { pathParams: { code } })
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
      );
  }

  searchCapital(capital: string): Observable<Country[]> {
    const url = this.getEndpoint("searchCapital");
    return this._apiHandlerService.get<Country[]>(url, { pathParams: { capital }, context: {actionsForAnHttpError: {modal: {excludeStatusCodes: [HttpStatusCode.NotFound]}}} })
      .pipe(
      );
  }

  searchCountry(country: string): Observable<Country[]> {
    const url = this.getEndpoint("searchCountry");
    return this._apiHandlerService.get<Country[]>(url, { pathParams: { country }, context: {actionsForAnHttpError: {modal: {excludeStatusCodes: [HttpStatusCode.NotFound]}}} })
      .pipe(
      );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = this.getEndpoint("searchRegion");
    return this._apiHandlerService.get<Country[]>(url, { pathParams: { region }, context: {actionsForAnHttpError: {modal: {excludeStatusCodes: [HttpStatusCode.NotFound]}}} })
      .pipe(
        catchError((e) => of([])),
      );
  }


}
