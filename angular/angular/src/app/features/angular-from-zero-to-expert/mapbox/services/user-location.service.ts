import { Injectable, signal } from '@angular/core';
import { Coordinates } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  private _userLocation = signal<Coordinates|null>(null);
  public userLocation = this._userLocation.asReadonly();

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.getUserLocation();
  }

  private getUserLocation() {
    navigator.geolocation.getCurrentPosition(({coords}) => {
      this._userLocation.set({
        longitude: coords.longitude,
        latitude: coords.latitude
      });
    });
  }
}
