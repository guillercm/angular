import { HttpRequest } from "@angular/common/http";
import { TimeoutError } from "rxjs";

export interface TimeoutInterceptorData {
    req: HttpRequest<unknown>,
    error: TimeoutError
}