import { HttpRequest } from "@angular/common/http";

export interface LoaderInterceptorData {
    req: HttpRequest<unknown>,
}