import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { DestroyRef, inject } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { InterceptorService } from "./services/interceptor.service";
import { HttpErrorModalComponent } from "@core/components/http-error-modal/http-error-modal.component";
import { ModalService } from "@core/services/modal/modal.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ErrorModalData } from "@core/components/http-error-modal/interfaces/data.interface";


export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const interceptorService = inject(InterceptorService);
  const modalService = inject(ModalService);
  const destroyRef = inject(DestroyRef);
  // const languageService = inject(LanguageService);
  const context = interceptorService.getContextFromRequest(req);

  const shouldShowErrorModal = (statusCode: HttpStatusCode): boolean => {
    const { enableGlobalErrorModal } = context;
    switch (typeof enableGlobalErrorModal) {
      case 'boolean':
        return enableGlobalErrorModal;
      case 'object':
        const { onlyForStatusCodes, excludeStatusCodes } = enableGlobalErrorModal;
        if (Array.isArray(onlyForStatusCodes) && onlyForStatusCodes.includes(statusCode)) return true;
        if (Array.isArray(excludeStatusCodes) && excludeStatusCodes.includes(statusCode)) return false;
        break;
    }
    return false;
  }

  const openErrorModal = (data: ErrorModalData) => {
    modalService.open({
      component: HttpErrorModalComponent,
      destroyRef: destroyRef,
      args: {
        data,
        clicked: (event: string) => {
          //console.log(event)
        }
      },
      options: {
        animation: true
      }
    });
  }

  return next(req).pipe(
    catchError(error => {
      console.log(error)

      if (!(error instanceof HttpErrorResponse)) return throwError(() => error); //  || error.error instanceof ErrorEvent
      let status_code = 0;
      if (error.error.databaseErrorResponse) {
        console.log(error.error)
      }
      switch (error.status) {
        case HttpStatusCode.NotFound:
          status_code = HttpStatusCode.NotFound;
          break;
        case HttpStatusCode.UnprocessableEntity:
          status_code = HttpStatusCode.UnprocessableEntity;
      }
      // if (shouldShowErrorModal(error.status)) openErrorModal(status_code.toString())
      interceptorService.addOrUdpateHttpRequest({ state: 'error', req, context, error });
      return throwError(() => error);
    }),
  );
}
