import { DataHttpContext } from "../interfaces/data-http-context.interface";

export const DEFAULT_HTTP_CONTEXT: DataHttpContext = {
  actionsWhileLoadingHttpRequest: ['spinner'],
  actionsForAnHttpError: ['modal'],
  // actionsForAnHttpError: {
  //   'modal': {
  //     onlyForStatusCodes: [HttpStatusCode.NotFound]
  //   }
  // },
  skipApiKey: false,
}