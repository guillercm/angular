import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiHandlerParams } from '@core/interfaces/api-handler/api-handler-params.interface';
import { ApiHandlerPathParams } from '@core/interfaces/api-handler/api-handler-path-params.interface';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  private readonly _httpClient = inject(HttpClient);

  public get<T>(url: string, { pathParams, queryParams }: ApiHandlerParams = {}): Observable<T> {
    url = this.setPathParams(url, pathParams);
    return this._httpClient.get<T>(url, { params: queryParams }).pipe(shareReplay(1));
  }

  public post<T>(url: string, data: any, { pathParams, queryParams }: ApiHandlerParams = {}): Observable<T> {
    url = this.setPathParams(url, pathParams);
    return this._httpClient.post<T>(url, data, { params: queryParams }).pipe(shareReplay(1));
  }

  public delete<T>(url: string, { pathParams, queryParams }: ApiHandlerParams = {}): Observable<T> {
    url = this.setPathParams(url, pathParams);
    return this._httpClient.delete<T>(url, { params: queryParams }).pipe(shareReplay(1));
  }

  public put<T>(url: string, data: any, { pathParams, queryParams }: ApiHandlerParams = {}): Observable<T> {
    url = this.setPathParams(url, pathParams);
    return this._httpClient.put<T>(url, data, { params: queryParams }).pipe(shareReplay(1));
  }

  public patch<T>(url: string, data: any, { pathParams, queryParams }: ApiHandlerParams = {}): Observable<T> {
    url = this.setPathParams(url, pathParams);
    return this._httpClient.patch<T>(url, data, { params: queryParams }).pipe(shareReplay(1));
  }

  private setPathParams(url: string, pathParams?: ApiHandlerPathParams): string {
    if (!pathParams) return url;
    Object.keys(pathParams).forEach((key: string) => {
      url = url.replace(`{${key}}`, pathParams[key])
    })
    return url;
  }

}
