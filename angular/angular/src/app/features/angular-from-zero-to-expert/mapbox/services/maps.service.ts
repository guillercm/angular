import { ApiClientService } from './api/api-client.service';
import { computed, ElementRef, inject, Injectable, signal } from '@angular/core';
import { coordinates } from '../interfaces/coordinates';
import { Coordinates, Feature } from '../interfaces/places';
import { LngLat, LngLatBounds, Map, Marker, Popup, SourceSpecification } from 'mapbox-gl';
import { PolylineService } from './polyline.service';
import { Route } from '../interfaces/directions';
import { dataStylesMap } from '../interfaces/dataStylesMap';
import { StylesMapsService } from './styles-maps.service';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private readonly _apiClient = inject(ApiClientService);

  private readonly _polylineService = inject(PolylineService);

  private readonly _stylesMapsService = inject(StylesMapsService);

  public readonly apiKey = computed(() => this._apiClient.apiKey())

  private _map = signal<Map | null>(null);
  public map = this._map.asReadonly();

  private _markers = signal<Marker[]>([]);

  public readonly isMapReady = computed<boolean>(() => !!this.map())

  private _zoom = signal<number>(2);
  public readonly zoom = this._zoom.asReadonly();

  private _currentLngLat = signal<LngLat>(new LngLat(-3.759884398515993, 40.27393082965864));
  public readonly currentLngLat = this._currentLngLat.asReadonly();

  private _dataStylesMap = signal<dataStylesMap | null>(null);
  public readonly dataStylesMap = this._dataStylesMap.asReadonly();

  public createMap(container: ElementRef<HTMLElement>) {
    this._dataStylesMap.set(this._stylesMapsService.imgStyles);
    const map = new Map({
      container: container?.nativeElement, // container ID
      style: "", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      accessToken: this.apiKey()
    });
    this.setMap(map);
  }

  private setMap(map: Map) {
    this._map.set(map);
    this.mapListeners();
    map.setStyle(this._stylesMapsService.actualStyle())
  }

  mapListeners() {
    const map = this.map();
    if (!map) throw 'Mapa no inicializado';

    map.on('zoom', (ev) => {
      this._zoom.set(map.getZoom())
    });

    map.on('zoomend', (ev) => {
      if (map!.getZoom() < 18) return;
      map!.zoomTo(18);
    });

    map.on('move', () => {
      this._currentLngLat.set(map.getCenter());
      const { lng, lat} = this._currentLngLat();
    });
  }

  flyTo(coords: Coordinates | null, zoom = 14) {
    if (!this.isMapReady() || !coords) return;
    this.map()?.flyTo(
      {
        zoom,
        center: {
          lng: coords.longitude,
          lat: coords.latitude
        }
      }
    )
  }

  zoomIn() {
    this.map()?.zoomIn();
  }

  zoomOut() {
    this.map()?.zoomOut();
  }

  zoomTo(zoom: number) {
    this._zoom.set(zoom);
    this.map()?.zoomTo(zoom);
  }

  setStyle(style?: string) {
    if (!style) return;
    this._stylesMapsService.setStyle(style);
    this.map()?.setStyle(style);
  }

  createMarkersFromPlaces(places: Feature[], { long, lat }: coordinates = { long: 0, lat: 0 }) {
    if (!this.map) return;

    this._markers().forEach(marker => marker.remove());

    if (!places.length) return;

    const newMarkers: Marker[] = [];

    for (const place of places) {
      const marker = this.addMarker(place.properties.coordinates, `<h6>${place.properties.name}</h6>`);
      if (marker) {
        newMarkers.push(marker);
        marker.getLngLat()
      }
    }
    this._markers.set(newMarkers);

    const bounds = new LngLatBounds();

    bounds.extend(new LngLat(long, lat))
    newMarkers.forEach((marker: Marker) => bounds.extend(marker.getLngLat()))


    this.map()?.fitBounds(bounds);
  }

  addMarker(coords: Coordinates, htmlPupup = ''): Marker | null {
    const map = this.map();
    if (!map || !coords) return null;
    const {longitude, latitude} = coords;
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const popup = new Popup().setHTML(htmlPupup);

    popup.on('open', (event) => {
      this.flyTo(coords)
    })
    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(new LngLat(longitude, latitude)).setPopup(popup)
      .addTo(map);

    marker.on('dragend', () => { });
    return marker;
  }

  getRouteBeetweenPoints(start: coordinates, end: coordinates) {
    this._apiClient.getDirections(start.long, start.lat, end.long, end.lat).subscribe((
      response => this.drawPolyline(response.routes[0])
    ))
  }

  private drawPolyline(route: Route) {
    const map = this.map();
    if (!map) return;
    console.log({ distanciaKms: route.distance / 1000, duracion: route.duration / 60 })

    console.log(route.geometry)
    const coords = this._polylineService.decode(route.geometry);

    const bounds = new LngLatBounds();

    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    map.fitBounds(bounds);

    const sourceData: SourceSpecification = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    if (map.getLayer('RouteString')) {
      map.removeLayer('RouteString');
      map.removeSource('RouteString');
    }


    map.addSource('RouteString', sourceData);

    map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    });
  }

  destroyMap() {
    this.map()?.remove();
  }
}
