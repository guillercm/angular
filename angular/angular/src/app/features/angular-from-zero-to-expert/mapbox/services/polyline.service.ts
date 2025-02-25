import { Injectable } from '@angular/core';
import * as polyline from '@mapbox/polyline';

@Injectable({
  providedIn: 'root'
})
export class PolylineService {
  decode(encoded: string): number[][] {
    const coords = polyline.decode(encoded);
    for (let i = 0; i < coords.length; i++) {
      const coord = coords[i];
      const aux = coord[1];
      coord[1] = coord[0];
      coord[0] = aux;
    }
    return coords;
  }

  encode(coordinates: [number, number][]): string {
    return polyline.encode(coordinates);
  }
}
