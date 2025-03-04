import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject, output, signal, ViewContainerRef } from '@angular/core';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';
import { MapsService } from '../../services/maps.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ModalService } from '@core/services/modal/modal.service';
import { ModalChangeMapStyleComponent } from '../modal-change-map-style/modal-change-map-style.component';
import { ModalSavedPlacesComponent } from '../modal-saved-places/modal-saved-places.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { Place } from '../../interfaces/place.interface';

@Component({
  selector: 'features-mapbox-side-menu',
  imports: [CommonModule, SharedButtonComponent, TranslatePipe, CheckboxComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _viewContainerRef = inject(ViewContainerRef);

  private readonly _modalService = inject(ModalService);

  private readonly _mapsService = inject(MapsService);

  public readonly onOpenPlace = output<Place>()

  protected zoom = computed(() => this._mapsService.zoom())

  protected readonly showRain = computed(() => this._mapsService.showRain())

  protected readonly showSnow = computed(() => this._mapsService.showSnow())


  openModalChangeMapStyle() {
    this._modalService.open({
      component: ModalChangeMapStyleComponent,
      destroyRef: this._destroyRef,
      options: {
        animation: true,
        centered: true,
        size: 'lg',
        scrollable: true
      }
    })
  }

  openModalSavedPlaces() {
    const modal = this._modalService.open({
      component: ModalSavedPlacesComponent,
      destroyRef: this._destroyRef,
      args: {
        onOpenPlace: (place: Place) => {
          this.onOpenPlace.emit(place);
          this._mapsService.addMarker(place, this._viewContainerRef)
          this._mapsService.flyTo(place.coordinates)
        }
      },
      options: {
        animation: true,
        centered: true,
        size: 'lg',
        scrollable: true
      }
    })
  }

  onShowCoords(checked: boolean) {
    this._mapsService.showMapCoords(checked);
  }

  onShowRain(checked: boolean) {
    this._mapsService.showMapRain(checked);
  }

  onShowSnow(checked: boolean) {
    this._mapsService.showMapSnow(checked);
  }

  zoomIn() {
    this._mapsService.zoomIn();
  }

  zoomOut() {
    this._mapsService.zoomOut();
  }

  zoomChanged(value: string) {
    this._mapsService.zoomTo(Number(value));
  }
}
