import { computed, inject, Injectable, signal } from '@angular/core';
import { coordinates } from '../interfaces/coordinates';
import { HttpClient } from '@angular/common/http';
import { Feature, PlacesResponse } from '../interfaces/places';
import { environment } from '../../../environments/environments';
import { PlacesApiClientService } from '../api/places-api-client.service';
import { MapsService } from './maps.service';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesApi = inject(PlacesApiClientService);

  private mapService = inject(MapsService);

  public useLocation = signal<coordinates|null>(null);

  public isUserLocationReady = computed<boolean>(() => !!this.useLocation());

  public isLoadingPlaces = signal<boolean>(false);

  public places = signal<Feature[]>([]);

  public proximity = computed(() => {
    const location = this.useLocation();
    if (!location) return "";
    const {lat, long} = location;
    return `${lat},${long}`;
  })

  public async getUserLocation(): Promise<coordinates> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords: {longitude, latitude}}) => {
          const data = {long: longitude, lat: latitude };
          this.useLocation.set(data);
          resolve(data);
        },
        ( err ) => {
          console.error(err);
          reject("No se pudo obtener la geolocalización")
        }
      )
    })
  }

  constructor() {
    this.getUserLocation();
  }

  getPlacesByQuery(query: string) {
    if (!query.trim().length) {
      this.isLoadingPlaces.set(false);
      this.places.set([]);
      return;
    }
    this.isLoadingPlaces.set(true);
    this.placesApi.get<PlacesResponse>('', {
      params: {
        q: query,
        country: 'es',
        proximity: this.proximity()
      }
    }).
    subscribe((resp: PlacesResponse) => {
      this.isLoadingPlaces.set(false);
      this.places.set(resp.features);
      this.mapService.createMarkersFromPlaces(resp.features, this.useLocation() || undefined);
    })
  }

  deletePlaces() {
    this.places.set([]);
  }



}
