import { Component, inject, OnInit, effect, ViewChild, ElementRef } from '@angular/core';
import { MapsService, PlacesService } from '../../services';
import { environment } from '../../../../environments/environments';
import { LngLat, Map, Marker, Popup } from 'mapbox-gl';
import { coordinates } from '../../interfaces/coordinates';

@Component({
  selector: 'app-map-view',
  standalone: false,

  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements OnInit {

  public placesServices = inject(PlacesService);

  private mapsService = inject(MapsService);

  public map?: Map;

  @ViewChild('map') divMap?: ElementRef;

  ngOnInit(): void {

  }

  effectLocation = effect(() => {
    const coordinates = this.placesServices.useLocation();
    if (!coordinates) return;
    const { long, lat } = coordinates;
    this.map = new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: new LngLat(long, lat),
      accessToken: environment.mapbox_key,
      zoom: 13
    });
    this.mapsService.setMap(this.map);
    this.mapsService.addMarker(coordinates, '<h1>Aquí estoy</h1><p>Aquí programo yo</p>');
  })



}
