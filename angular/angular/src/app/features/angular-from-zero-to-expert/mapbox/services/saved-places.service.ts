import { Injectable, inject, signal } from '@angular/core';
import { Place } from '../interfaces/place.interface';
import { SessionService } from '@core/services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class SavedPlacesService {

  private readonly _sessionService = inject(SessionService);

  private _places = signal<Place[]>([]);
  public readonly places = this._places.asReadonly();

  constructor() {
    this.loadPlaces();
  }

  public addPlace(place: Place) {
    this._places.update((places: Place[]) => {
      places.push(place);
      return places;
    });
    this.savePlaces();
  }

  public removePlace(place: Place) {
    this._places.update((places: Place[]) => {
      return places.filter(p => !this.placeIsEqual(p, place));
    })
    this.savePlaces();
  }

  public placeIsSaved(place: Place): boolean {
    return this.places().some((p: Place) => this.placeIsEqual(p,  place));
  }

  private placeIsEqual(place: Place, place2: Place) {
    return place.full_address === place2.full_address
  }

  private loadPlaces() {
    const places = this._sessionService.getItem<Place[]>("places", []);
    this._places.set(places);
  }

  private savePlaces() {
    this._sessionService.setItem("places", this._places())
  }

}
