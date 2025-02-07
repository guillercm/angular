import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

export function simpsonInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log(req);
    console.log("*********")
    HttpStatusCode.NotFound
    
    return next(req).pipe(
        catchError(error => {
            if (error instanceof HttpErrorResponse) {
                switch (error.status) {
                    case HttpStatusCode.NotFound:
                        console.log("No se encontró :(")
                }
                // Manejo de errores HTTP
                // console.error('HTTP Error:', error);
            } else {
                // console.error('An error occurred:', error);
            }
            return throwError(() => new Error(error.statusText));
        })
    );
}