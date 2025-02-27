import { Injectable, signal } from '@angular/core';
import { Place } from '../interfaces/place.interface';

@Injectable({
  providedIn: 'root'
})
export class ItinerariesService {

  private _places = signal<Place[]>([]);
  public readonly places = this._places.asReadonly();

}
