import { computed, inject, Injectable, signal } from '@angular/core';
import { Api } from '@core/interfaces/config/config';
import { GenericObject } from '@core/interfaces/generic-object/generic-object.interface';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { PlacesResponse } from '../../interfaces/places';
import { DirectionsResponse } from '../../interfaces/directions';
import { map, Observable } from 'rxjs';
import { PlacesAdapter } from '../../adapters/places/places-adapter';
import { Place } from '../../interfaces/place.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private readonly _apiHandler = inject(ApiHandlerService);

  private readonly _configService = inject(AppConfigService);

  private readonly _placesAdapter = inject(PlacesAdapter);

  private _configApi = signal<Api | null>(null);
  // public readonly configApi = this._configApi.asReadonly();

  public readonly apiKey = computed(() => this._configApi()?.apiKey || '')

  private readonly _language = computed(() => this._configService.config().languages.default)

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._configApi.set(this._configService.config().apis["mapbox"]);
  }

  private getEndpoint(endpoint: string): string {
    const configApi = this._configApi();
    if (!configApi) return "";
    return `${configApi.baseUrl}${configApi.endpoints[endpoint]}`;
  }

  public getPlaces(query: string, options?: GenericObject): Observable<Place[]> {
    return this._apiHandler.get<PlacesResponse>(this.getEndpoint("getPlaces"), {
      params: {
        q: query,
        limit: 10,
        language: this._language(),
        access_token: this.apiKey(),
        ...options
      }
    }).pipe(map((value: PlacesResponse) => this._placesAdapter.adapt(value)));
  }

  public getDirections(startLong: number, startLat: number, endLong: number, endLat: number): Observable<DirectionsResponse> {
    return this._apiHandler.get<DirectionsResponse>(this.getEndpoint("getDirections"), {
      pathParams: {
        startLong, startLat, endLong, endLat
      },
      params: {
        alternatives: false,
        geometries: 'polyline',
        language: this._language(),
        overview: 'simplified',
        steps: true,
        access_token: this.apiKey(),
      }
    });
  }
}
