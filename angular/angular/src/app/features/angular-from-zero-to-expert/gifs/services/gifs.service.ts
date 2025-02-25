import { Api } from '@core/interfaces/config/config';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private readonly _apiHandler = inject(ApiHandlerService);

  private readonly _configService = inject(AppConfigService);

  private _configApi = signal<Api|null>(null);

  private _gifs = signal<Gif[]>([]);

  public readonly gifs = this._gifs.asReadonly();

  private _isLoadingGifs = signal<boolean>(false);
  public readonly isLoadingGifs = this._isLoadingGifs.asReadonly();

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._configApi.set(this._configService.config().apis["gifs"]);
  }

  private getEndpoint(endpoint: string): string {
    const configApi = this._configApi();
    if (!configApi) return "";
    return `${configApi.baseUrl}${configApi.endpoints[endpoint]}`;
  }

  public searchTag(tag: string, limit: number = 15): Observable<SearchResponse> {
    const params = new HttpParams()
    .set('api_key', this._configApi()?.apiKey || '')
    .set('limit', limit)
    .set('q', tag);
    const url = this.getEndpoint("search");
    this._isLoadingGifs.set(true);
    return this._apiHandler.get<SearchResponse>(url, {params}).pipe(
      tap(() => this._isLoadingGifs.set(false))
    );
  }

  public setGifs(gifs: Gif[]) {
    this._gifs.set(gifs);
  }
}
