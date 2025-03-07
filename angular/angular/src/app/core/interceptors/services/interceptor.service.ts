import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { JsonHandlerService } from '@core/services/json-handler/json-handler.service';
import { HttpRequest } from '@angular/common/http';
import { HTTP_CONTEXT } from '../context/http-context';
import { DEFAULT_HTTP_CONTEXT } from '../context/default-http-context';
import { DataHttpContext } from '../interfaces/data-http-context.interface';
import { DataHttpRequest } from '../interfaces/data-http-request.interface';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  private _dataHttpRequests = signal<DataHttpRequest[]>([]);

  public dataHttpRequests = this._dataHttpRequests.asReadonly();

  public addOrUdpateHttpRequest(dataHttpRequest: DataHttpRequest) {
    this._dataHttpRequests.update((values: DataHttpRequest[]) => {
      const index = values.findIndex(request => request.context.id === dataHttpRequest.context.id);
      if (dataHttpRequest.state === 'complete' && values[index].state === 'error') return [...values];
      if (index === -1) return [...values, dataHttpRequest];
      values[index] = dataHttpRequest;
      return [...values];
    })
  }

  public getHttpRequestById(idHttpRequest: string) {
    return this._dataHttpRequests().find((value) => value.context.id === idHttpRequest)
  }

  public getContextFromRequest(req: HttpRequest<unknown>): DataHttpContext {
    const context = req.context.get(HTTP_CONTEXT);
    return {...DEFAULT_HTTP_CONTEXT, ...context}
  }

}
