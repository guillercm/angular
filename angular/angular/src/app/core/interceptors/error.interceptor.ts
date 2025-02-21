import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { InterceptorService } from "./services/interceptor.service";

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const interceptorService = inject(InterceptorService);
    return next(req).pipe(
        catchError(error => {
            console.log(error)
            if (error instanceof HttpErrorResponse && !(error.error instanceof ErrorEvent)) {
                switch (error.status) {
                    case HttpStatusCode.InternalServerError:
                        console.log(500)
                }
                interceptorService.httpErrorData.set({
                    req, error
                });

            }
            return throwError(() => error);
        })
    );
}