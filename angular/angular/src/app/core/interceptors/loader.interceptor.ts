import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, finalize, throwError } from "rxjs";
import { InterceptorService } from "./services/interceptor.service";


export function loaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const interceptorService = inject(InterceptorService);
    interceptorService.addRequestLoader({req})
    return next(req).pipe(finalize(() => interceptorService.removeRequestLoader({req}))
    );
}