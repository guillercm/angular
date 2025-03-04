import { HttpHeaders, HttpParams } from "@angular/common/http";
import { ApiHandlerPathParams } from "./api-handler-path-params.interface";
import { DataHttpContext } from "@core/interceptors/interfaces/data-http-context.interface";

export interface ApiHandlerParams {
  headers?: HttpHeaders | {
      [header: string]: string | string[];
  };
  context?: DataHttpContext;
  observe?: 'body';
  params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  pathParams?: ApiHandlerPathParams,
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?: {
      includeHeaders?: string[];
  } | boolean;
}

