import { Component, computed, inject, signal } from '@angular/core';
import { MapsService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';
import { coordinates } from '../../interfaces/coordinates';

@Component({
  selector: 'app-search-results',
  standalone: false,

  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  private placesService = inject(PlacesService);

  private mapService = inject(MapsService);

  public selectedId = signal<string>('');

  public isLoadingPlaces = computed(() => this.placesService.isLoadingPlaces() )

  public places = computed(() => this.placesService.places() )

  flyTo(place: Feature) {
    this.selectedId.set(place.id);
    const {latitude: lat, longitude: long} = place.properties.coordinates;
    const coordinates = {lat, long};
    this.mapService.flyTo(coordinates);
    // this.mapService.addMarker(coordinates, `<h6>${place.properties.name}</h6><p>${place.properties.full_address}</p>`)
  }

  getDirections(place: Feature) {
    this.placesService.deletePlaces();
    const start = this.placesService.useLocation() || {long: 0, lat: 0};
    const {longitude: long, latitude: lat} = place.properties.coordinates;
    const end: coordinates = {long, lat};

    this.mapService.getRouteBeetweenPoints(start, end);
  }

}
