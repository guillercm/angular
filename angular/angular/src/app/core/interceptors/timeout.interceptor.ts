import { environment } from "@environments/environments";
import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { inject, DestroyRef } from '@angular/core';
import { InterceptorService } from "./services/interceptor.service";
import { ModalService } from "@core/services/modal/modal.service";
import { Observable, timeout, catchError, throwError, TimeoutError } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TimeoutModalComponent } from "@core/components/timeout-modal/timeout-modal.component";
import { ErrorModalData } from "@core/components/http-error-modal/interfaces/data.interface";

const timeoutSeconds = environment.timeoutSeconds;

export function timeoutInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const interceptorService = inject(InterceptorService);
  const modalService = inject(ModalService);
  const destroyRef = inject(DestroyRef);
  // const languageService = inject(LanguageService);
  const context = interceptorService.getContextFromRequest(req);

  const shouldShowErrorModal = (): boolean => Boolean(context.showGlobalModalTimeout);

  const openErrorModal = (data: ErrorModalData) => {
      modalService.open({
        component: TimeoutModalComponent,
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
      if (shouldShowErrorModal()) {
        // openErrorModal("timeout");
      }
      interceptorService.addOrUdpateHttpRequest({ state: 'error', timeoutError: error, req, context });
      return throwError(() => error);
    })
  );
}
