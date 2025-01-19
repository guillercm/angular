import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { StylesMapsService } from '../../services/styles-maps.service';
import { dataStylesMap } from '../../interfaces/dataStylesMap';
import { dataStyleMap } from '../../interfaces/dataStyleMap';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'maps-mini-map',
  standalone: false,

  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent {
  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;
  dataStylesMap!: dataStylesMap;
  private map?: Map;

  constructor(private stylesMapsService: StylesMapsService) {

  }

  ngAfterViewInit() {
    if (!this.divMap?.nativeElement) throw "Map Div not found";
    if (!this.lngLat) throw "LngLat can't be null";

    this.map = new Map({
      container: this.divMap.nativeElement,
      style: '',
      center: this.lngLat,
      zoom: 15,
      interactive: false,
      accessToken: environment.mapbox_key
    });

    this.initStyles();

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(this.map)

  }


  changeMapStyle(style: dataStyleMap): void {
    this.map?.setStyle(style.mapboxStyle);
  }

  initStyles() {
    this.dataStylesMap = this.stylesMapsService.imgStyles;
    this.changeMapStyle(this.dataStylesMap.defaultStyle);
  }
}
