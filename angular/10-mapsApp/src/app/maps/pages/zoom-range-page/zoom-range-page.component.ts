import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { LngLat, Map } from 'mapbox-gl';
import { environment } from '../../../../environments/environments';
import { StylesMapsService } from '../../services/styles-maps.service';
import { dataStylesMap } from '../../interfaces/dataStylesMap';
import { dataStyleMap } from '../../interfaces/dataStyleMap';
@Component({
  standalone: false,

  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy  {
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = -2;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-3.759884398515993, 40.27393082965864);
  dataStylesMap!: dataStylesMap;

  constructor(private stylesMapsService: StylesMapsService) {

  }

  initStyles() {
    this.dataStylesMap = this.stylesMapsService.imgStyles;
    this.changeMapStyle(this.dataStylesMap.defaultStyle);
  }

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: "", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      accessToken: environment.mapbox_key
    });
    this.initStyles();
    this.mapListeners();
  }

  changeMapStyle(style: dataStyleMap): void {
    this.map?.setStyle(style.mapboxStyle);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
      const { lng, lat} = this.currentLngLat;
      console.log({lng, lat})
    });

  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
}
