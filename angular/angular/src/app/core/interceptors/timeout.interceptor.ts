import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { Observable, timeout, catchError, throwError, TimeoutError } from "rxjs";
import { InterceptorService } from "./services/interceptor.service";
import { inject } from "@angular/core";
import { environment } from "@environments/environments";

const timeoutSeconds = environment.timeoutSeconds;

export function timeoutInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const interceptorService = inject(InterceptorService);
    return next(req).pipe(
        timeout(timeoutSeconds * 1000),
        catchError(error => {
            if (error instanceof TimeoutError) interceptorService.timeoutErrorData.set({
                req, error
            });
            return throwError(() => error);
        })
    );
}