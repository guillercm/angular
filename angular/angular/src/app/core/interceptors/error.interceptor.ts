import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { InterceptorService } from "./services/interceptor.service";


export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const interceptorService = inject(InterceptorService);
    return next(req).pipe(
        catchError(error => {
            if (error instanceof HttpErrorResponse) interceptorService.httpErrorData.set({
                req, error
            });
            return throwError(() => new Error(error.statusText));
        })
    );
}