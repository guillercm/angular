import { inject, Injectable } from '@angular/core';
import { ModelAdapter } from '@core/interfaces/adapter/model-adapter.interface';
import { ModelAdapterService } from '@core/services/model-adapter/model-adapter.service';
import { Feature, PlacesResponse } from '../../interfaces/places';
import { Place } from '../../interfaces/place.interface';

@Injectable({
  providedIn: 'root',
})
export class PlacesAdapter implements ModelAdapter<PlacesResponse, Place[]> {

  private readonly _modelAdapter = inject(ModelAdapterService);

  adapt = (placesResponse: PlacesResponse): Place[] => {
    return this._modelAdapter.adapt<PlacesResponse, Place[]>(placesResponse, (placesResponse: PlacesResponse) => {
      return placesResponse.features.map((feature: Feature) => {
        return {
          full_address: feature.properties.full_address,
          coordinates: feature.properties.coordinates
        }
      })
    })
  }
}
