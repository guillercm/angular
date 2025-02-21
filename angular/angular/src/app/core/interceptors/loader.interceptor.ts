import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { InterceptorService } from "./services/interceptor.service";


export function loaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const interceptorService = inject(InterceptorService);
    interceptorService.addRequestLoader({req})
    const modifiedReq = req.clone({ setHeaders: { status: 'loading' } });
    return next(modifiedReq).pipe(finalize(() => interceptorService.removeRequestLoader({req}))
    );
}