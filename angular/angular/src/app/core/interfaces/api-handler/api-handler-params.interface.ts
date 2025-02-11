import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";
import { ApiHandlerPathParams } from "./api-handler-path-params.interface";

export interface ApiHandlerParams {
  headers?: HttpHeaders | {
      [header: string]: string | string[];
  };
  context?: HttpContext;
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

