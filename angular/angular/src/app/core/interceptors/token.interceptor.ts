import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { InterceptorService } from "./services/interceptor.service";
import { TokenService } from "@features/angular-from-zero-to-expert/tesloshop/frontend/auth/services/token.service";

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const interceptorService = inject(InterceptorService);
  const context = interceptorService.getContextFromRequest(req);
  if (context.skipApiKey) return next(req);

  const token = inject(TokenService).token();

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });
  return next(newReq);
}



// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { Observable, catchError, switchMap, throwError } from 'rxjs';
// import { SessionService } from '../../services/session/session.service';
// import { AuthService } from '../../auth/services/auth.service';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(
//     private sessionService: SessionService,
//     private authservice: AuthService
//   ) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     let token: string | null = '';
//     token = this.sessionService.getItem(
//       this.sessionService.getItem('config')?.TOKEN_KEY
//     );
//     return next.handle(this.addHeaders(request, token)).pipe(
//       catchError(errordata => {
//         if (errordata.status === 401 && !errordata.url.includes('signin')) {
//           return this.handleRefrehToken(request, next);
//         }
//         return throwError(() => errordata);
//       })
//     );
//   }

//   handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
//     return this.authservice.GenerateRefreshToken().pipe(
//       switchMap((data: any) => {
//         this.authservice.SaveTokens(data.restResponse);
//         return next.handle(this.addHeaders(request, data.restResponse.accessToken));
//       }),
//       catchError(errodata => {
//         this.authservice.logout();
//         return throwError(() => errodata);
//       })
//     );
//   }

//   private addHeaders(request: HttpRequest<any>, token: string | null) {
//     if (token) {
//       return request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     } else {
//       return request;
//     }
//   }
// }
