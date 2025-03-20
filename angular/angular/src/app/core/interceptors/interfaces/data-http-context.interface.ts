import { HttpStatusCode } from "@angular/common/http";
import { ActionForAnHttpError } from "./actionForAnHttpError.type";
import { ActionWhileLoadingHttpRequest } from "./actionWhileLoadingHttpRequest.type";


export interface DataHttpContext {
  id?: string;
  actionsWhileLoadingHttpRequest?: ActionWhileLoadingHttpRequest[];
  actionsForAnHttpError?: Partial<Record<ActionForAnHttpError, {
    onlyForStatusCodes?: HttpStatusCode[];
    excludeStatusCodes?: HttpStatusCode[];
  }>> | ActionForAnHttpError[];
  skipApiKey?: boolean;
}
