import { HttpErrorResponse, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { DataHttpContext } from '../interfaces/data-http-context.interface';
import { ActionForAnHttpError } from '../interfaces/actionForAnHttpError.type';
import { DEFAULT_HTTP_CONTEXT } from '../context/default-http-context';
import { AppTranslateService } from '@core/services/translate/app-translate.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { ModalService } from '@core/services/modal/modal.service';
import { HttpErrorModalComponent } from '@core/components/http-error-modal/http-error-modal.component';

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

  executeActions(statusCode: HttpStatusCode) {

    if (!this.shouldExecuteAction('modal', statusCode, true)) return;

    const config = this._configService.config();

    const data = config.errors.httpStatus[statusCode] || config.errors.httpStatus["generic"];
    
    // TO DO: Configurar back para recibir los 3 strings:
    console.log(config.errors.validations["auth"]["email"]["unique"].data)
    
    this._modalService.open({
      component: HttpErrorModalComponent,
      destroyRef: this._destroyRef,
      args: {
        data: data.data.modal,
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
