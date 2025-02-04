import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-bar',
  standalone: false,

  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  private placesService = inject(PlacesService);

  onQueryChanged( query: string = '' ) {



  }

  onChanged(query: any) {
    this.placesService.getPlacesByQuery(query);
  }
}
