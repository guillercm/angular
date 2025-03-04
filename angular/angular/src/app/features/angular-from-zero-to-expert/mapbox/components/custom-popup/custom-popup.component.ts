import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Place } from '../../interfaces/place.interface';
import { SharedButtonComponent } from "@shared/components/button/shared-button.component";
import { SavedPlacesService } from '../../services/saved-places.service';
import { ItinerariesService } from '../../services/itineraries.service';

@Component({
  selector: 'features-mapbox-custom-popup',
  imports: [SharedButtonComponent],
  templateUrl: './custom-popup.component.html',
  styleUrl: './custom-popup.component.css'
})
export class CustomPopupComponent {

  private readonly _savedPlacesService = inject(SavedPlacesService);

  private readonly _itinerariesService = inject(ItinerariesService);

  public place = input.required<Place>();

  public canAddPlaceToItinerarie = computed(() => this._itinerariesService.canAddPlace(this.place()))

  private _showBtnSavePlace = signal<boolean>(true);
  protected readonly showBtnSavePlace = this._showBtnSavePlace.asReadonly();



  constructor() {
    this.initialize();
  }

  private initialize() {
    effect(() => {
      this._showBtnSavePlace.set(!this._savedPlacesService.placeIsSaved(this.place()))
    })
  }

  savePlace() {
    this._savedPlacesService.addPlace(this.place());
    this._showBtnSavePlace.set(false);
  }

  addToItinerarie() {
    this._itinerariesService.addPlace(this.place());
  }
}
