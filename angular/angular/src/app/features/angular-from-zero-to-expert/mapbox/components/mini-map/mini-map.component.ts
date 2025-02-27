import { Component, ElementRef, OnDestroy, inject, input, signal, viewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { ApiClientService } from '../../services/api/api-client.service';
import { Place } from '../../interfaces/place.interface';

@Component({
  selector: 'features-mapbox-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements OnDestroy {
  
  public place = input<Place>();

  private readonly _divMap = viewChild.required<ElementRef<HTMLElement>>('map')

  private readonly _apiClient = inject(ApiClientService);

  private _map = signal<Map | null>(null);
  protected readonly map = this._map.asReadonly();

  ngAfterViewInit() {
    this.initialize();
  }

  private initialize() {
    this.initMiniMap();
  }

  private initMiniMap() {
    const place = this.place();
    const divMap = this._divMap();
    if (!place || !divMap) return;
    const lngLat = new LngLat(place.coordinates.longitude, place.coordinates.latitude);
    const map = new Map({
      container: divMap.nativeElement,
      style: '',
      center: lngLat,
      zoom: 15,
      interactive: false,
      accessToken: this._apiClient.apiKey()
    });
    new Marker()
      .setLngLat(lngLat)
      .addTo(map)
    this._map.set(map);
  }

  ngOnDestroy(): void {
    this.map()?.remove();
  }
 
}
