// https://medium.com/@alejandrocoding/angular-httpcontext-c%C3%B3mo-evitar-un-interceptor-en-determinadas-peticiones-75f87937f0db
import { HttpContext, HttpContextToken } from "@angular/common/http";
import { DataHttpContext } from "../interfaces/data-http-context.interface";
import { DEFAULT_HTTP_CONTEXT } from "./default-http-context";

export const HTTP_CONTEXT = new HttpContextToken<DataHttpContext>(() => (DEFAULT_HTTP_CONTEXT));

export function setHttpContext(data?: DataHttpContext) {
  return new HttpContext().set(HTTP_CONTEXT, data);
}
