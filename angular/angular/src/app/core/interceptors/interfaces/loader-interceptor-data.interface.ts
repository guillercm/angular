import { HttpRequest } from "@angular/common/http";
import { DataHttpContext } from "./data-http-context.interface";

export interface LoaderInterceptorData {
  req: HttpRequest<unknown>,
  context: DataHttpContext
}
