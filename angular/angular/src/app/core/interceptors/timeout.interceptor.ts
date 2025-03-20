import { environment } from "@environments/environments";
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpStatusCode } from "@angular/common/http";
import { inject } from '@angular/core';
import { InterceptorService } from "./services/interceptor.service";
import { Observable, timeout, catchError, throwError, TimeoutError } from "rxjs";
import { ErrorInterceptorService } from "./services/error-interceptor.service";

const timeoutSeconds = environment.timeoutSeconds;

export function timeoutInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const interceptorService = inject(InterceptorService);
  const errorInterceptorService = inject(ErrorInterceptorService);
  const context = interceptorService.getContextFromRequest(req);

  errorInterceptorService.setRequest(req);
  errorInterceptorService.setContext(context);
  

  return next(req).pipe(
    timeout(timeoutSeconds * 1000),
    // retry({
    //   count: 3, // Número máximo de reintentos
    //   delay: (error, retryCount) => {
    //     // if (!(error instanceof TimeoutError)) throw error;
    //     console.log(error)

    //     console.log(`Intento de reintento ${retryCount} después de un Timeout`);
    //     return timer(retryCount * 1000); // Incrementa el retraso con cada intento (1s, 2s, 3s...)
    //     // Lanza otros errores directamente
    //   }
    // }),
    catchError(error => {
      if (!(error instanceof TimeoutError)) return throwError(() => error);
      errorInterceptorService.executeActions(HttpStatusCode.RequestTimeout);
      interceptorService.addOrUdpateHttpRequest({ state: 'error', timeoutError: error, req, context });
      return throwError(() => error);
    })
  );
}
