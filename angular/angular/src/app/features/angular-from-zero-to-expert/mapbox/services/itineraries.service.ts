import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Place } from '../interfaces/place.interface';
import { SessionService } from '@core/services/session/session.service';
import { MapsService } from './maps.service';
import { Itinerary } from '../interfaces/itinerary.interface';
import { TravelMode } from '../interfaces/travel-mode.enum';
import { SpeechService } from './speech.service';

@Injectable({
  providedIn: 'root'
})
export class ItinerariesService {

  private readonly _sessionService = inject(SessionService);

  private readonly _mapsService = inject(MapsService);

  private readonly _speechService = inject(SpeechService);

  private _places = signal<Place[]>([]);
  public readonly places = this._places.asReadonly();

  public readonly defaultTravelMode = TravelMode.driving;

  constructor() {
    this.loadPlaces();
  }

  public canAddPlace(place: Place) {
    if (this.placeOnTheItinerary(place) || this.places().length > 4) return false;
    return true;
  }

  public addPlace(place: Place) {
    if (!this.canAddPlace(place)) return;
    this._places.update((places: Place[]) => {
      if (!place.travelMode) place.travelMode = this.defaultTravelMode;
      places.push(place);
      return places;
    });
    this.savePlaces();
  }

  public removeItinerariesOfPlaces() {
    this._speechService.cancel();
    this._mapsService.removeOldMarkers();
    this._mapsService.removeLayers();
    this._places.update((places: Place[]) => {
      return places.map(p => {
        delete p.itinerary;
        return p;
      });
    })
  }

  public updateItinerariesOfPlace(placeIndex: number, itinerary: Itinerary) {
    this._places.update((places) => {
      places[placeIndex].itinerary = itinerary;
      return [...places];
    })
  }

  public updateTravelModeOfPlace(placeIndex: number, travelMode: TravelMode) {
    this._places.update((places) => {
      places[placeIndex].travelMode = travelMode;
      return [...places];
    })
  }

  public removePlace(place: Place) {
    this._places.update((places: Place[]) => {
      return places.filter(p => !this.placeIsEqual(p, place));
    })
    this.savePlaces();
  }

  public placeOnTheItinerary(place: Place): boolean {
    return this.places().some((p: Place) => this.placeIsEqual(p, place));
  }

  public movePlace(previousIndex: number, currentIndex: number) {
    this._places.update((places: Place[]) => {
      const [movedItem] = places.splice(previousIndex, 1);
      places.splice(currentIndex, 0, movedItem);
      return [...places]
    })
    this.savePlaces();
  }

  private placeIsEqual(place: Place, place2: Place) {
    return place.full_address === place2.full_address
  }

  private loadPlaces() {
    const places = this._sessionService.getItem<Place[]>("itineraries", []);
    places.map((place: Place) => this.addPlace(place));
  }

  private savePlaces() {
    this._sessionService.setItem("itineraries", this._places())
  }
}
