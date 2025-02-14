import { HttpErrorResponse, HttpRequest } from "@angular/common/http";

export interface ErrorInterceptorData {
    req: HttpRequest<unknown>,
    error: HttpErrorResponse
}