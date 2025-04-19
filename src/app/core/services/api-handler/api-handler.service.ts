import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, WritableSignal, inject } from '@angular/core';
import { DEFAULT_HTTP_CONTEXT } from '@core/interceptors/context/default-http-context';
import { setHttpContext } from '@core/interceptors/context/http-context';
import { ApiHandlerParams } from '@core/interfaces/api-handler/api-handler-params.interface';
import { Api } from '@core/interfaces/config/config';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  private readonly _httpClient = inject(HttpClient);


  public get<T>(url: string, options?: ApiHandlerParams): Observable<T> {
    const context = this.getContext(url, options);
    url = this.setPathParams(url, options);
    return this._httpClient.get<T>(url, {...options, context: context, responseType: options?.responseType ? options?.responseType as 'json' : 'json'}).pipe(shareReplay(1));
  }

  public post<T>(url: string, body: any, options?: ApiHandlerParams): Observable<T> {
    const context = this.getContext(url, options);
    url = this.setPathParams(url, options);
    return this._httpClient.post<T>(url, body, {...options, context: context, responseType: options?.responseType ? options?.responseType as 'json' : 'json'}).pipe(shareReplay(1));
  }

  public delete<T>(url: string, options?: ApiHandlerParams): Observable<T> {
    const context = this.getContext(url, options);
    url = this.setPathParams(url, options);
    return this._httpClient.delete<T>(url, {...options, context: context, responseType: options?.responseType ? options?.responseType as 'json' : 'json'}).pipe(shareReplay(1));
  }

  public put<T>(url: string, body: any, options?: ApiHandlerParams): Observable<T> {
    const context = this.getContext(url, options);
    url = this.setPathParams(url, options);
    return this._httpClient.put<T>(url, body, {...options, context: context, responseType: options?.responseType ? options?.responseType as 'json' : 'json'}).pipe(shareReplay(1));
  }

  public patch<T>(url: string, body: any, options?: ApiHandlerParams): Observable<T> {
    const context = this.getContext(url, options);
    url = this.setPathParams(url, options);
    return this._httpClient.patch<T>(url, body, {...options, context: context, responseType: options?.responseType ? options?.responseType as 'json' : 'json'}).pipe(shareReplay(1));
  }



  public getEndpoint(api: WritableSignal<Api | null>, endpoint: string) {
    const configApi = api();
    if (!configApi) return "";
    return `${configApi.baseUrl}${configApi.endpoints[endpoint]}`;
  }

  private setPathParams(url: string, options?: ApiHandlerParams): string {
    const pathParams = options?.pathParams;
    if (!pathParams) return url;
    Object.keys(pathParams).forEach((key: string) => {
      url = url.replace(`{${key}}`, pathParams[key])
    })
    return url;
  }

  private getContext(url: string, options: ApiHandlerParams | undefined): HttpContext | undefined {
    return options?.context ? setHttpContext({id: url, ...options?.context}) : setHttpContext({...DEFAULT_HTTP_CONTEXT, id: url});
  }

}
