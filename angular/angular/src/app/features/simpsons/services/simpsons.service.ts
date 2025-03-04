import { Api } from '@core/interfaces/config/config';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { HttpContext, HttpContextToken, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { Simpson } from '../interfaces/simpson.interface';
import { SimpsonAdapter } from '../adapters/simpsons/simpsons-adapter';
import { SimpsonResponse } from '../interfaces/api/simpsonsRespose.interface';
import SimpsonsComponent from '../pages/simpsons/simpsons.component';
import { setHttpContext } from '@core/interceptors/context/http-context';

@Injectable({
  providedIn: 'root'
})
export class SimpsonsService {

  private readonly _apiHandler = inject(ApiHandlerService);

  private readonly _configService = inject(AppConfigService);

  private readonly _simpsonsAdapter = inject(SimpsonAdapter);

  private _configApi = signal<Api | null>(null);

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
    return this._apiHandler.get<SimpsonResponse>(url, { pathParams: { id }, params: { id } }).pipe(
      map((response: SimpsonResponse) => this._simpsonsAdapter.adapt(response))
    );
  }

  getSimpsons() {
    const url = this.getEndpoint("getSimpsons");
    return this._apiHandler.get<SimpsonResponse[]>(url, { context: { id: "getSimpsons" }}).pipe(
      map((response: SimpsonResponse[]) => this._simpsonsAdapter.adaptArray(response))
    )
  }

  getSimpsonsWithDelay(seconds: number) {
    // return throwError(() => new HttpErrorResponse({"status": 500, "error": "Error del servidor"}));
    return this._apiHandler.get<any>("https://dummyjson.com/RESOURCE/",
      {
        params: { delay: seconds * 1000 },
        context: { id: "getSimpsonsWithDelay", showGlobalLoader: true }
      }).
      pipe(
        switchMap((region) => this.getSimpsons()),
        catchError(error => {
          return this.getSimpsons()
        })
      );
  }
}
