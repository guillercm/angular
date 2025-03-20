import { ErrorInterceptorService } from "./services/error-interceptor.service";
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { InterceptorService } from "./services/interceptor.service";
import { Observable, catchError, throwError } from "rxjs";


export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const interceptorService = inject(InterceptorService);
  const errorInterceptorService = inject(ErrorInterceptorService);
  const context = interceptorService.getContextFromRequest(req);

  errorInterceptorService.setRequest(req);
  errorInterceptorService.setContext(context);

  return next(req).pipe(
    catchError(err => {
      console.log(err)
      if (!(err instanceof HttpErrorResponse)) return throwError(() => err); //  || error.error instanceof ErrorEvent
      errorInterceptorService.executeActions(err.status);
      if (err.error.databaseErrorResponse) {
        console.log(err.error)
      }
      interceptorService.addOrUdpateHttpRequest({ state: 'error', req, context, error: err });
      return throwError(() => err);
    }),
  );
}
