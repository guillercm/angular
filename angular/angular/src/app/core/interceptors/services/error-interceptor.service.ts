import { HttpErrorResponse, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { DataHttpContext } from '../interfaces/data-http-context.interface';
import { ActionForAnHttpError } from '../interfaces/actionForAnHttpError.type';
import { DEFAULT_HTTP_CONTEXT } from '../context/default-http-context';
import { AppTranslateService } from '@core/services/translate/app-translate.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { ModalService } from '@core/services/modal/modal.service';
import { HttpErrorModalComponent } from '@core/components/http-error-modal/http-error-modal.component';
import { DatabaseErrorResponse } from '../interfaces/database-error-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  private _context: DataHttpContext = DEFAULT_HTTP_CONTEXT;

  private _req!: HttpRequest<unknown>

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _translate = inject(AppTranslateService);

  private readonly _configService = inject(AppConfigService);

  private readonly _modalService = inject(ModalService);

  setContext(context: DataHttpContext) {
    this._context = context;
  }

  setRequest(request: HttpRequest<unknown>) {
    this._req = request;
  }

  private shouldExecuteAction(actionForAnHttpError: ActionForAnHttpError, statusCode: HttpStatusCode, defaultValue: boolean = true): boolean {
    const { actionsForAnHttpError } = this._context;
    if (!actionsForAnHttpError) return defaultValue;
    if (Array.isArray(actionsForAnHttpError)) return actionsForAnHttpError.includes(actionForAnHttpError)
    const statusCodesData = actionsForAnHttpError[actionForAnHttpError];
    if (!statusCodesData) return defaultValue;
    const { onlyForStatusCodes, excludeStatusCodes } = statusCodesData;
    if (Array.isArray(onlyForStatusCodes) && onlyForStatusCodes.includes(statusCode)) return true;
    if (Array.isArray(excludeStatusCodes) && excludeStatusCodes.includes(statusCode)) return false;
    return false;
  }

  executeActions(statusCode: HttpStatusCode, databaseErrorResponse?: DatabaseErrorResponse) {

    if (!this.shouldExecuteAction('modal', statusCode, true)) return;

    const config = this._configService.config();

    let data = null;
    let values = {}
    if (databaseErrorResponse) {
      const {databaseError: {context, field: {name: field, args}, error_type }} = databaseErrorResponse;
      values = args;
      data = config.errors.validations?.[context]?.[field]?.[error_type] || null;
    } else {
      data = config.errors.httpStatus[statusCode];
    }
    if (!data) {
      data = config.errors.httpStatus["generic"];
    }

    this._modalService.open({
      component: HttpErrorModalComponent,
      destroyRef: this._destroyRef,
      args: {
        data: {...data.data.modal, data: values},
        clicked: (event: string) => {
          //console.log(event)
        }
      },
      options: {
        animation: true
      }
    });
  }


}
