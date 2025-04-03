import { ErrorInterceptorService } from "./services/error-interceptor.service";
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { inject } from "@angular/core";
import { InterceptorService } from "./services/interceptor.service";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";


export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const interceptorService = inject(InterceptorService);
  const errorInterceptorService = inject(ErrorInterceptorService);
  const context = interceptorService.getContextFromRequest(req);

  errorInterceptorService.setRequest(req);
  errorInterceptorService.setContext(context);

  return next(req).pipe(
    catchError(err => {
      if (!(err instanceof HttpErrorResponse)) return throwError(() => err); //  || error.error instanceof ErrorEvent
      console.log(err)
      const {status, databaseErrorResponse = null} = err.error || {};
      errorInterceptorService.executeActions(status, databaseErrorResponse);
      switch (status) {
        case HttpStatusCode.Unauthorized:
          router.navigate(['angular-from-zero-to-expert/tesloshop/auth/login']);
          break;
        case HttpStatusCode.InternalServerError:
          router.navigate(['internal-server-error']);
          break;
      }
      interceptorService.addOrUdpateHttpRequest({ state: 'error', req, context, error: err });
      return throwError(() => err);
    }),
  );
}
