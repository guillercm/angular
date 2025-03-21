import { Api } from '@core/interfaces/config/config';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Coordinates, PlacesResponse } from '../../interfaces/places.interface';
import { DirectionsResponse } from '../../interfaces/directions.interface';
import { GenericObject } from '@core/interfaces/generic-object/generic-object.interface';
import { Itinerary } from '../../interfaces/itinerary.interface';
import { ItineraryAdapter } from '../../adapters/itinerary/itinerary-adapter';
import { map, Observable } from 'rxjs';
import { Place } from '../../interfaces/place.interface';
import { PlacesAdapter } from '../../adapters/places/places-adapter';
import { TravelMode } from '../../interfaces/travel-mode.enum';
import { AppTranslateService } from '@core/services/translate/app-translate.service';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private readonly _apiHandlerService = inject(ApiHandlerService);

  private readonly _configService = inject(AppConfigService);

  private readonly _placesAdapter = inject(PlacesAdapter);

  private readonly _itineraryAdapter = inject(ItineraryAdapter);

  private _configApi = signal<Api | null>(null);

  public readonly apiKey = computed(() => this._configApi()?.apiKey || '')
  
  private readonly _appTranslateService = inject(AppTranslateService);

  private readonly _language = computed(() => this._appTranslateService.currentLang() )

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._configApi.set(this._configService.config().apis["mapbox"]);
  }

  private getEndpoint(endpoint: string): string {
    return this._apiHandlerService.getEndpoint(this._configApi, endpoint)
  }

  public getPlaces(query: string, options?: GenericObject): Observable<Place[]> {
    return this._apiHandlerService.get<PlacesResponse>(this.getEndpoint("getPlaces"), {
      params: {
        q: query,
        limit: 10,
        language: this._language(),
        access_token: this.apiKey(),
        ...options
      }
    }).pipe(
      map((value: PlacesResponse) => this._placesAdapter.adapt(value)));
  }

  public getItinerary(travelMode: TravelMode, start: Coordinates, end: Coordinates): Observable<Itinerary> {
    const {longitude: startLong, latitude: startLat} = start;
    const {longitude: endLong, latitude: endLat} = end;
    return this._apiHandlerService.get<DirectionsResponse>(this.getEndpoint("getDirections"), {
      pathParams: {
        profile: travelMode, startLong, startLat, endLong, endLat
      },
      params: {
        alternatives: false,
        geometries: 'polyline',
        language: this._language(),
        overview: 'simplified',
        steps: true,
        access_token: this.apiKey(),
      }
    }).pipe(
      map((value: DirectionsResponse) => this._itineraryAdapter.adapt(value))
    );
  }
}
