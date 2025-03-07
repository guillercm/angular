import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { DataHttpContext } from "./data-http-context.interface";
import { TimeoutError } from "rxjs";

export interface DataHttpRequest {
  state: 'loading' | 'error' | 'complete',
  error?: HttpErrorResponse,
  timeoutError?: TimeoutError,
  req: HttpRequest<unknown>,
  context: DataHttpContext
}
