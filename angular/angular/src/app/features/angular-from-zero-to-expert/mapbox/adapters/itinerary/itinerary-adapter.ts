import { Feature, PlacesResponse } from '../../interfaces/places.interface';
import { inject, Injectable } from '@angular/core';
import { ModelAdapter } from '@core/interfaces/adapter/model-adapter.interface';
import { ModelAdapterService } from '@core/services/model-adapter/model-adapter.service';
import { Place } from '../../interfaces/place.interface';
import { Itinerary, ItineraryManeuver, ItineraryStep } from '../../interfaces/itinerary.interface';
import { DirectionsResponse, Maneuver } from '../../interfaces/directions.interface';
import { TravelMode } from '../../interfaces/travel-mode.enum';

@Injectable({
  providedIn: 'root',
})
export class ItineraryAdapter implements ModelAdapter<DirectionsResponse, Itinerary> {

  private readonly _modelAdapter = inject(ModelAdapterService);

  adapt = (directionsResponse: DirectionsResponse): Itinerary => {
    return this._modelAdapter.adapt<DirectionsResponse, Itinerary>(directionsResponse, (directionsResponse: DirectionsResponse) => {
      const route = directionsResponse.routes[0];

      const getItineraryManeuver =  (maneuver: Maneuver):ItineraryManeuver => {
        switch (maneuver.modifier) {
          case 'left': case 'sharp left': case 'slight left':
            return ItineraryManeuver.turnLeft;
          case 'right': case 'sharp right': case 'slight right':
            return ItineraryManeuver.turnRight;
        }
        return ItineraryManeuver.depart;
      }
      let mode = "";
      return {
        distance: {
          meters: route.distance,
          kilometers: route.distance / 1000
        },
        duration: {
          hours: route.duration / 60 / 60,
          minutes: route.duration / 60
        },
        steps: route.legs[0].steps.map((value) => {
          mode = value.mode;
          return {
            geometry: value.geometry,
            name: value.name,
            instruction: value.maneuver.instruction,
            location: {
              latitude: value.maneuver.location[1],
              longitude: value.maneuver.location[0]
            },
            maneuver: getItineraryManeuver(value.maneuver)
          } as ItineraryStep
        }),
        geometry: route.geometry,
        travelMode: mode as TravelMode || TravelMode.driving
      }
    })
  }
}
