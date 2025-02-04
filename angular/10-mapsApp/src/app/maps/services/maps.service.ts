import { computed, inject, Injectable, signal } from '@angular/core';
import { AnySourceData, LngLat, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { coordinates } from '../interfaces/coordinates';
import { Feature } from '../interfaces/places';
import { DirectionsApiClientService } from '../api/directions-api-client.service';
import { PolylineService } from './polyline.service';
import { DirectionsResponse, Route } from '../interfaces/directions';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private directionsApi = inject(DirectionsApiClientService);

  private polylineService = inject(PolylineService);

  private _map = signal<Map | null>(null);
  public map = this._map.asReadonly();

  private _markers = signal<Marker[]>([]);

  isMapReady = computed<boolean>(() => !!this.map())

  setMap(map: Map) {
    this._map.set(map);
  }

  flyTo(coords: coordinates | null, zoom = 14) {
    if (!this.isMapReady() || !coords) return;
    this.map()?.flyTo(
      {
        zoom,
        center: {
          lng: coords.long,
          lat: coords.lat
        }
      }
    )
  }

  createMarkersFromPlaces(places: Feature[], {long, lat}: coordinates = {long : 0, lat : 0}) {
    if (!this.map) return;

    this._markers().forEach(marker => marker.remove());

    if (!places.length) return;

    const newMarkers: Marker[] = [];

    for (const place of places) {
      const { latitude: lat, longitude: long } = place.properties.coordinates;
      const coordinates = { lat, long };
      const marker = this.addMarker(coordinates, `<h6>${place.properties.name}</h6>`);
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

  addMarker(coords: coordinates, htmlPupup = ''): Marker | null {
    const map = this._map();
    if (map === null || !coords) return null;
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    if (!this.isMapReady()) return null;

    const popup = new Popup().setHTML(htmlPupup);

    popup.on('open', (event) => {
      this.flyTo(coords)
    })
    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(new LngLat(coords.long, coords.lat)).setPopup(popup)
      .addTo(map);

    marker.on('dragend', () => { });
    return marker;
  }

  getRouteBeetweenPoints(start: coordinates, end: coordinates) {
    this.directionsApi.get<DirectionsResponse>(`/${start.long},${start.lat};${end.long},${end.lat}`).subscribe((
      response => this.drawPolyline(response.routes[0])
    ))
  }

  private drawPolyline(route: Route) {
    const map = this.map();
    if (!map) return;
    console.log({distanciaKms: route.distance / 1000, duracion: route.duration / 60})

    console.log(route.geometry)
    const coords = this.polylineService.decode(route.geometry);



    const bounds = new LngLatBounds();

    coords.forEach( ([ lng, lat ]) => {
      bounds.extend([ lng, lat ]);
    });

    map.fitBounds( bounds );

    const sourceData: AnySourceData = {
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

    if ( map.getLayer('RouteString') ) {
      map.removeLayer('RouteString');
      map.removeSource('RouteString');
    }


    map.addSource('RouteString', sourceData );

    map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join':'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    });
  }


  constructor() {
  }
}
