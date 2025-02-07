import { Injectable, inject } from '@angular/core';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { Observable, map, take } from 'rxjs';
import { SimpsonAdapter } from '../adapters/simpsons/simpsons-adapter';
import { Simpson } from '../interfaces/simpson.interface';
import { SimpsonResponse } from '../interfaces/api/simpsonsRespose.interface';

@Injectable({
  providedIn: 'root'
})
export class SimpsonsService {

  private readonly _apiHandler = inject(ApiHandlerService);

  private readonly _configService = inject(AppConfigService);

  private readonly _simpsonsAdapter = inject(SimpsonAdapter);

  get configApi() {
    return this._configService.config().apis["simpsons"];
  }

  get baseUrl() {
    return this.configApi.baseUrl;
  }

  get endpoints() {
    return this.configApi.endpoints;
  }

  getSimpsonById(id: number): Observable<Simpson> {
    const url = this.baseUrl + this.endpoints["getSimpsonById"];
    return this._apiHandler.get<SimpsonResponse>(url, { pathParams: { id } }).pipe(
      map((response: SimpsonResponse) => this._simpsonsAdapter.adapt(response))
    );
  }

  getSimpsons() {
    const url = this.baseUrl + this.endpoints["getSimpsons"]
    return this._apiHandler.get<SimpsonResponse[]>(url).pipe(
      map((response: SimpsonResponse[]) => this._simpsonsAdapter.adaptArray(response))
    )
  }
}
