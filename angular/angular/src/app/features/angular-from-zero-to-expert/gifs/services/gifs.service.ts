import { Api } from '@core/interfaces/config/config';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private readonly _apiHandlerService = inject(ApiHandlerService);

  private readonly _configService = inject(AppConfigService);

  private _configApi = signal<Api|null>(null);

  private _gifs = signal<Gif[]>([]);

  public readonly gifs = this._gifs.asReadonly();



  constructor() {
    this.initialize();
  }

  private initialize() {
    this._configApi.set(this._configService.config().apis["gifs"]);
  }

  private getEndpoint(endpoint: string): string {
    return this._apiHandlerService.getEndpoint(this._configApi, endpoint)
  }

  public searchTag(tag: string, page = 0, itemsPerPage = 10): Observable<SearchResponse> {
    const params = new HttpParams()
    .set('api_key', this._configApi()?.apiKey || '')
    .set('limit', itemsPerPage)
    .set('offset', page * itemsPerPage)
    .set('q', tag);
    const url = this.getEndpoint("search");
    return this._apiHandlerService.get<SearchResponse>(url, {params, context: {id: 'searchGifs', showGlobalLoader: false} }).pipe();
  }

  public setGifs(gifs: Gif[]) {
    this._gifs.set(gifs);
  }

  public addGifs(gifs: Gif[]) {
    this._gifs.update((actualgifs: Gif[]) => {
      return [...actualgifs, ...gifs]
    })
  }
}
