import { ApiHandlerPathParams } from "./api-handler-path-params.interface";
import { ApiHandlerQueryParams } from "./api-handler-query-params.interface";

export interface ApiHandlerParams {
    pathParams?: ApiHandlerPathParams,
    queryParams?: ApiHandlerQueryParams
}