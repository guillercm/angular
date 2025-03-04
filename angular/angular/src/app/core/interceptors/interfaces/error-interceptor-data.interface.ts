import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { DataHttpContext } from "./data-http-context.interface";

export interface ErrorInterceptorData {
  req: HttpRequest<unknown>,
  error: HttpErrorResponse,
  context: DataHttpContext
}
