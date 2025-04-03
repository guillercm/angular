import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, inject, model, OnDestroy, signal, viewChild } from '@angular/core';
import { MapsSearcherComponent } from "../../components/maps-searcher/maps-searcher.component";
import { MapsService } from '../../services/maps.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedButtonComponent } from "@shared/components/button/shared-button.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";
import { ItinerariesComponent } from "../../components/itineraries/itineraries.component";
import { ItinerariesService } from '../../services/itineraries.service';

@Component({
  selector: 'features-mapbox-maps-page',
  imports: [CommonModule, SharedButtonComponent, NgbCollapseModule, SideMenuComponent, MapsSearcherComponent, ItinerariesComponent],
  templateUrl: './maps-page.component.html',
  styleUrl: './maps-page.component.css'
})
export class MapsPageComponent implements OnDestroy {

  private readonly _mapsService = inject(MapsService);

  private readonly _itinerariesService = inject(ItinerariesService);

  private readonly _divMap = viewChild.required<ElementRef<HTMLDivElement>>('map')

  protected readonly currentLngLat = computed(() => this._mapsService.currentLngLat())

  protected readonly showCoords = computed(() => this._mapsService.showCoords())


  ngAfterViewInit(): void {
    const divMap = this._divMap();
    if (!divMap) throw 'El elemento HTML no fue encontrado';
    this._mapsService.createMap(divMap);
  }

  protected isCollapsed = model<boolean>(false);

  protected toggleCollapse() {
    this._itinerariesService.removeItinerariesOfPlaces();
    this.isCollapsed.update((isCollapsed) => !isCollapsed)
  }

  public setIsCollapsed(value: boolean) {
    this.isCollapsed.set(value);
  }

  ngOnDestroy(): void {
    this._mapsService.destroyMap();
  }

}
