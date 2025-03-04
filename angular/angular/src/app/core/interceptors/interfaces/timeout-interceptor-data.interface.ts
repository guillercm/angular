import { HttpRequest } from "@angular/common/http";
import { TimeoutError } from "rxjs";
import { DataHttpContext } from "./data-http-context.interface";

export interface TimeoutInterceptorData {
  req: HttpRequest<unknown>,
  error: TimeoutError,
  context: DataHttpContext
}
