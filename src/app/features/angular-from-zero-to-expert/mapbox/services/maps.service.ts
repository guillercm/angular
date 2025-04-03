import { ApiClientService } from './api/api-client.service';
import { ComponentRef, computed, effect, ElementRef, inject, Injectable, NgZone, signal, ViewContainerRef } from '@angular/core';
import { Coordinates } from '../interfaces/places.interface';
import { CustomPopupComponent } from '../components/custom-popup/custom-popup.component';
import { dataStylesMap } from '../interfaces/dataStylesMap.interface';
import mapboxgl, { LngLat, LngLatBounds, Map, Marker, PropertyValueSpecification, SourceSpecification } from 'mapbox-gl';
import { Place } from '../interfaces/place.interface';
import { PolylineService } from './polyline.service';
import { Route } from '../interfaces/directions.interface';
import { SavedPlacesService } from './saved-places.service';
import { StylesMapsService } from './styles-maps.service';
import { Itinerary } from '../interfaces/itinerary.interface';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private readonly _ngZone = inject(NgZone);

  private readonly _apiClient = inject(ApiClientService);

  private readonly _polylineService = inject(PolylineService);

  private readonly _stylesMapsService = inject(StylesMapsService);

  private readonly _savedPlacesService = inject(SavedPlacesService);

  protected readonly _savedPlaces = computed(() => this._savedPlacesService.places());

  private _showCoords = signal<boolean>(true);
  public showCoords = this._showCoords.asReadonly();

  private _showSnow = signal<boolean>(true);
  public showSnow = this._showSnow.asReadonly();

  private _showRain = signal<boolean>(true);
  public showRain = this._showRain.asReadonly();

  private _map = signal<Map | null>(null);
  public map = this._map.asReadonly();

  private _markers = signal<Marker[]>([]);

  private _zoom = signal<number>(2);
  public readonly zoom = this._zoom.asReadonly();

  private _currentLngLat = signal<LngLat>(new LngLat(-3.759884398515993, 40.27393082965864));
  public readonly currentLngLat = this._currentLngLat.asReadonly();

  private _dataStylesMap = signal<dataStylesMap | null>(null);
  public readonly dataStylesMap = this._dataStylesMap.asReadonly();

  constructor() {
    this.initialize();
  }

  private initialize() {
    effect(() => {
      this.showRain();
      if (this.map()?.isStyleLoaded()) {
        this.setRain();
      }
    })
    effect(() => {
      this.showSnow();
      if (this.map()?.isStyleLoaded()) {
        this.setSnow();
      }
    })
    effect(() => {
      const style = this._stylesMapsService.mapsStyle();
      this.map()?.setStyle(style)
    })
  }



  setRain() {
    const map = this.map();
    if (!map) return;
    map.setRain(this.showRain() ? {
      density: 1,
      intensity: 1,
      color: '#919191',
      opacity: 0.19,
      'center-thinning': 0,
      direction: [0, 50],
      'droplet-size': [1, 10],
      'distortion-strength': 0.5,
      vignette: 0.5,
    } : null)
  }

  setSnow() {
    const map = this.map();
    if (!map) return;
    const zoomBasedReveal = (value: number): PropertyValueSpecification<number> | undefined => {
      return ['interpolate', ['linear'], ['zoom'], 11, 0.0, 13, value];
    };
    map.setSnow(this.showSnow() ? {
      density: zoomBasedReveal(0.85),
      intensity: 1.0,
      'center-thinning': 0.1,
      direction: [0, 50],
      opacity: 1.0,
      color: `#ffffff`,
      'flake-size': 0.71,
      vignette: zoomBasedReveal(0.3),
      'vignette-color': `#ffffff`
    } : null);
  }

  public showMapCoords(show: boolean) {
    this._showCoords.set(show);
  }

  public showMapRain(show: boolean) {
    this._showRain.set(show);
  }

  public showMapSnow(show: boolean) {
    this._showSnow.set(show);
  }

  public createMap(container: ElementRef<HTMLElement>) {
    this._dataStylesMap.set(this._stylesMapsService.imgStyles);
    const map = new Map({
      container: container?.nativeElement, // container ID
      style: "", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      accessToken: this._apiClient.apiKey(),
      projection: 'globe',
      bearing: 12.8,
      hash: true
    });
    this.setMap(map);
  }

  private setMap(map: Map) {
    this._map.set(map);
    this.mapListeners();
  }

  mapListeners() {
    const map = this.map();
    if (!map) throw 'Mapa no inicializado';

    // map.on('click', (ev: mapboxgl.MapMouseEvent) => {
    //   const coords = ev.lngLat;
    //   console.log(coords)
    // })

    map.on('zoom', (ev) => {
      this._zoom.set(map.getZoom())
    });

    map.on('zoomend', (ev) => {
      if (map!.getZoom() < 18) return;
      map!.zoomTo(18);
    });

    map.on('move', () => {
      this._currentLngLat.set(map.getCenter());
      // const { lng, lat } = this._currentLngLat();
    });

    // map.addControl(new mapboxgl.FullscreenControl());
    // map.addControl(new mapboxgl.NavigationControl());
    // map.addControl(new mapboxgl.ScaleControl());

    map.on('style.load', () => {
      this.setRain();
      this.setSnow();
    });
  }

  flyTo(coords: Coordinates | null, zoom = 14) {
    const map = this.map();
    if (!map || !coords) return;
    map.flyTo(
      {
        zoom,
        center: {
          lng: coords.longitude,
          lat: coords.latitude
        },
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
  }

  public removeOldMarkers() {
    this._markers().forEach(marker => marker.remove());
    this._markers.set([]);
  }

  private getRandomColor = () => '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

  addMarker(place: Place, viewContainerRef: ViewContainerRef, removeOldMarkers = true): Marker | null {
    const map = this.map();
    const { coordinates } = place;
    if (!map || !coordinates) return null;
    if (removeOldMarkers) this.removeOldMarkers();
    const { longitude, latitude } = coordinates;
    const color = this.getRandomColor();

    const marker = new Marker({
      color: color,
      draggable: false
    }).setLngLat(new LngLat(longitude, latitude)).addTo(map);
    this._markers.update((markers: Marker[]) => [...markers, marker])
    const componentRef: ComponentRef<CustomPopupComponent> = viewContainerRef.createComponent(CustomPopupComponent);
    componentRef.setInput("place", place);
    marker.getElement()?.appendChild(componentRef.location.nativeElement);
    return marker;
  }


  public drawItinerary(itinerary: Itinerary, layer = 0) {

    const map = this.map();
    if (!map) return;


    const coords = this._polylineService.decode(itinerary.geometry);

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

    const layerName = this.getLayerName(layer);

    if (map.getLayer(layerName)) {
      map.removeLayer(layerName);
      map.removeSource(layerName);
    }

    map.addSource(layerName, sourceData);

    map.addLayer({
      id: layerName,
      type: 'line',
      source: layerName,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': this.getRandomColor(),
        'line-width': 4
      }
    });
  }

  private getLayerName = (layer: number) => `Layer${layer}`;

  public removeLayers() {
    const map = this.map();
    if (!map) return;
    let index = 0;
    while (map.getLayer(this.getLayerName(index))) {
      map.removeLayer(this.getLayerName(index));
      map.removeSource(this.getLayerName(index));
      index++;
    }
  }

  public destroyMap() {
    this.map()?.remove();
  }
}
