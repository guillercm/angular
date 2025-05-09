import { Api } from '@core/interfaces/config/config';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { Simpson } from '../interfaces/simpson.interface';
import { SimpsonAdapter } from '../adapters/simpsons/simpsons-adapter';
import { SimpsonResponse } from '../interfaces/api/simpsonsRespose.interface';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SimpsonsService {

  private readonly _apiHandlerService = inject(ApiHandlerService);

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
    return this._apiHandlerService.getEndpoint(this._configApi, endpoint)
  }


  getSimpsonById(id: number): Observable<Simpson> {
    const url = this.getEndpoint("getSimpsonById");
    return this._apiHandlerService.get<SimpsonResponse>(url, { pathParams: { id }, params: { id } }).pipe(
      map((response: SimpsonResponse) => this._simpsonsAdapter.adapt(response))
    );
  }

  getSimpsons() {
    const url = this.getEndpoint("getSimpsons");
    return this._apiHandlerService.get<SimpsonResponse[]>(url, { context: { id: "getSimpsons" } }).pipe(
      map((response: SimpsonResponse[]) => this._simpsonsAdapter.adaptArray(response))
    )
  }

  getSimpsonsWithDelay(seconds: number) {
    // return throwError(() => new HttpErrorResponse({"status": 500, "error": "Error del servidor"}));
    return this._apiHandlerService.get<any>("https://dummyjson.com/RESOURCE/",
      {
        params: { delay: seconds * 1000 },
        context: {
          id: "getSimpsonsWithDelay", actionsForAnHttpError: {
            'modal': {
              // onlyForStatusCodes: [HttpStatusCode.RequestTimeout]
            }
          }
        }
      }).
      pipe(
        switchMap(() => this.getSimpsons()),
      );
  }
}
