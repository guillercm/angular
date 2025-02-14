import { Injectable, inject, signal } from '@angular/core';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { Observable, catchError, delay, map, switchMap, take, tap, throwError } from 'rxjs';
import { SimpsonAdapter } from '../adapters/simpsons/simpsons-adapter';
import { Simpson } from '../interfaces/simpson.interface';
import { SimpsonResponse } from '../interfaces/api/simpsonsRespose.interface';
import { ModelAdapterService } from '@core/services/model-adapter/model-adapter.service';
import { Api } from '@core/interfaces/config/config';

@Injectable({
  providedIn: 'root'
})
export class SimpsonsService {

  private readonly _apiHandler = inject(ApiHandlerService);

  private readonly _configService = inject(AppConfigService);

  private readonly _simpsonsAdapter = inject(SimpsonAdapter);

  private _configApi = signal<Api|null>(null);

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._configApi.set(this._configService.config().apis["simpsons"]);
  }

  private getEndpoint(endpoint: string): string {
    const configApi = this._configApi();
    if (!configApi) return "";
    return `${configApi.baseUrl}${configApi.endpoints[endpoint]}`;
  }


  getSimpsonById(id: number): Observable<Simpson> {
    const url = this.getEndpoint("getSimpsonById");
    return this._apiHandler.get<SimpsonResponse>(url, { pathParams: { id } , params: {id}}).pipe(
      map((response: SimpsonResponse) => this._simpsonsAdapter.adapt(response))
    );
  }

  getSimpsons() {
    const url = this.getEndpoint("getSimpsons");
    return this._apiHandler.get<SimpsonResponse[]>(url).pipe(
      map((response: SimpsonResponse[]) => this._simpsonsAdapter.adaptArray(response))
    )
  }

  getSimpsonsWithDelay(seconds: number) {
    return this._apiHandler.get<any>("https://dummyjson.com/RESOURCE/", {params: {delay: seconds * 1000}}).
    pipe(
      switchMap((region) => this.getSimpsons()),
      catchError(error => {
          console.error(error)
          return this.getSimpsons()
      })
  );
  }
}
