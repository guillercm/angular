import { ErrorInterceptorData } from '../interfaces/error-interceptor-data.interface';
import { Injectable, computed, inject, signal } from '@angular/core';
import { JsonHandlerService } from '@core/services/json-handler/json-handler.service';
import { LoaderInterceptorData } from '../interfaces/loader-interceptor-data.interface';
import { TimeoutInterceptorData } from '../interfaces/timeout-interceptor-data.interface';
import { HttpRequest } from '@angular/common/http';
import { HTTP_CONTEXT } from '../context/http-context';
import { DEFAULT_HTTP_CONTEXT } from '../context/default-http-context';
import { DataHttpContext } from '../interfaces/data-http-context.interface';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  private readonly _jsonHandler = inject(JsonHandlerService);

  private _httpErrorData = signal<ErrorInterceptorData | null>(null);

  public readonly httpErrorData = this._httpErrorData.asReadonly();

  private _timeoutErrorData = signal<TimeoutInterceptorData | null>(null);

  public readonly timeoutErrorData = this._timeoutErrorData.asReadonly();

  private _loadingHttpRequests = signal<LoaderInterceptorData[]>([]);

  public readonly loadingHttpRequests = this._loadingHttpRequests.asReadonly();

  public readonly isLoadingSomeHttpRequest = computed(() => this.loadingHttpRequests().length > 0)

  public setHttpErrorData(data: ErrorInterceptorData) {
    this._httpErrorData.set(data)
  }

  public setTimeoutErrorData(data: TimeoutInterceptorData) {
    this._timeoutErrorData.set(data)
  }

  public addRequestLoader(loaderInterceptorData: LoaderInterceptorData) {
    this._loadingHttpRequests.update((value: LoaderInterceptorData[]) => {
      return [...value, loaderInterceptorData];
    })
  }

  public removeRequestLoader(loaderInterceptorData: LoaderInterceptorData) {
    this._loadingHttpRequests.set(this._loadingHttpRequests().filter(item => !this.loadingHttpRequestsEquals(item, loaderInterceptorData)));
  }

  private loadingHttpRequestsEquals(loaderInterceptorData1: LoaderInterceptorData, loaderInterceptorData2: LoaderInterceptorData): boolean {
    return this.Equals(loaderInterceptorData1, loaderInterceptorData2);
  }

  private Equals(data: LoaderInterceptorData, data2: LoaderInterceptorData): boolean {
    const { req: req1 } = data;
    const { req: req2 } = data2;
    const isEqual = this.isEqual;
    return isEqual(req1.url, req2.url) &&
      isEqual(req1.method, req2.method) &&
      isEqual(req1.headers, req2.headers) &&
      isEqual(req1.body, req2.body) &&
      isEqual(req1.params, req2.params) &&
      isEqual(req1.responseType, req2.responseType) &&
      isEqual(req1.withCredentials, req2.withCredentials);
  }

  private isEqual(obj: any, obj2: any) {
    return obj === obj2;
  }

  public getContextFromRequest(req: HttpRequest<unknown>): DataHttpContext {
    const context = req.context.get(HTTP_CONTEXT);
    return {...DEFAULT_HTTP_CONTEXT, ...context}
  }

}
