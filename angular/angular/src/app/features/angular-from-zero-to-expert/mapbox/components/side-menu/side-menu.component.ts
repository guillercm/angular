import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject } from '@angular/core';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';
import { MapsService } from '../../services/maps.service';
import { dataStyleMap } from '../../interfaces/dataStyleMap';
import { TranslatePipe } from '@ngx-translate/core';
import { ModalService } from '@core/services/modal/modal.service';
import { ModalChangeMapStyleComponent } from '../modal-change-map-style/modal-change-map-style.component';

@Component({
  selector: 'features-mapbox-side-menu',
  imports: [CommonModule, SharedButtonComponent, TranslatePipe],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _modalService = inject(ModalService);

  private readonly _mapsService = inject(MapsService);
  protected zoom = computed(() => this._mapsService.zoom())

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
