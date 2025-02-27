import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, inject, OnDestroy, signal, viewChild } from '@angular/core';
import { MapsSearcherComponent } from "../../components/maps-searcher/maps-searcher.component";
import { MapsService } from '../../services/maps.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedButtonComponent } from "@shared/components/button/shared-button.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  selector: 'features-mapbox-maps-page',
  imports: [CommonModule, SharedButtonComponent, NgbCollapseModule, SideMenuComponent, MapsSearcherComponent],
  templateUrl: './maps-page.component.html',
  styleUrl: './maps-page.component.css'
})
export class MapsPageComponent implements OnDestroy {

  private readonly _mapsService = inject(MapsService);

  private readonly _divMap = viewChild.required<ElementRef<HTMLElement>>('map')

  private _isCollapsed = signal<boolean>(true);

  protected readonly currentLngLat = computed(() => this._mapsService.currentLngLat())

  protected readonly showCoords = computed(() => this._mapsService.showCoords())


  ngAfterViewInit(): void {
    const divMap = this._divMap();
    console.log(divMap)
    if (!divMap) throw 'El elemento HTML no fue encontrado';
    this._mapsService.createMap(divMap);
  }

  

  get isCollapsed(): boolean {
    return this._isCollapsed();
  }

  set isCollapsed(value: boolean) {
    this._isCollapsed.set(value);
  }

  protected toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnDestroy(): void {
    this._mapsService.destroyMap();
  }

}
