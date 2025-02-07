export interface ApiHandlerQueryParams {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
}