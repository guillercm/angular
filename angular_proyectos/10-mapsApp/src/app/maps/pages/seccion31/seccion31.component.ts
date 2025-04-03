import { Component, computed, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-seccion31',
  standalone: false,

  templateUrl: './seccion31.component.html',
  styleUrl: './seccion31.component.css'
})
export class Seccion31Component {

  placesServices = inject(PlacesService);


  public isUserLocationReady = computed<boolean>(() => this.placesServices.isUserLocationReady() )

  constructor() {
    if (!navigator.geolocation) {
      console.error("El navegador no soporta geolocalización");
    }

  }
}
