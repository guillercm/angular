import { Component, computed, inject, output } from '@angular/core';
import { MiniMapComponent } from '../mini-map/mini-map.component';
import { SavedPlacesService } from '../../services/saved-places.service';
import { SharedButtonComponent } from "../../../../../shared/components/button/shared-button.component";
import { Place } from '../../interfaces/place.interface';
import { SharedImageComponent } from "../../../../../shared/components/image/shared-image.component";
import { TranslatePipe } from '@ngx-translate/core';
import { ItinerariesService } from '../../services/itineraries.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'features-mapbox-modal-saved-places',
  imports: [MiniMapComponent, SharedButtonComponent, SharedImageComponent, TranslatePipe],
  templateUrl: './modal-saved-places.component.html',
  styleUrl: './modal-saved-places.component.css'
})
export class ModalSavedPlacesComponent {

  private readonly _activeModal = inject(NgbActiveModal);

  private readonly _savedPlacesService = inject(SavedPlacesService);


  public readonly onOpenPlace = output<Place>()

  protected readonly savedPlaces = computed(() => this._savedPlacesService.places());

  protected removeSavedPlace(place: Place) {
    this._savedPlacesService.removePlace(place);
  }

  protected openPlace(place: Place) {
    this._activeModal.dismiss();
    this.onOpenPlace.emit(place);
  }

}
