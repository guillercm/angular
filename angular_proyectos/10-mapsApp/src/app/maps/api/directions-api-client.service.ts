import { HttpClient, HttpContext, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DirectionsApiClientService extends HttpClient {

  public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/driving';

  constructor(handler: HttpHandler) {
    super(handler);
  }

  public override get<T>(url: string) {
    url = this.baseUrl + url;
    return super.get<T>(url, {
      params: {
        alternatives: false,
        geometries: 'polyline',
        language: 'es',
        overview: 'simplified',
        steps: true,
        access_token: environment.mapbox_key
      }
    });
  }

}

