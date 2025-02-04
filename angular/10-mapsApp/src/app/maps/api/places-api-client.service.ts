import { HttpClient, HttpContext, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';

interface options {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }

@Injectable({
  providedIn: 'root'
})
export class PlacesApiClientService extends HttpClient {

  public baseUrl: string = 'https://api.mapbox.com/search/geocode/v6/forward';

  constructor(handler: HttpHandler) {
    super(handler);
  }

  public override get<T>(url: string, options?: {

    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
} ) {
    url = this.baseUrl + url;
    return super.get<T>(url, {
      params: {
        limit: 5,
        language: 'es',
        access_token: environment.mapbox_key,
        ...options?.params
      }
    });
  }

}
