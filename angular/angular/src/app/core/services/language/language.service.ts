import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { InterpolatableTranslationObject, InterpolationParameters, TranslateService } from '@ngx-translate/core';
import { Observable, of, tap } from 'rxjs';
import { AppConfigService } from '../configuration/app-config.service';
import { ValidationErrors } from '@angular/forms';
import { HttpStatus } from '@core/interfaces/http-status/http-status.interface';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly _translate = inject(TranslateService);

  private readonly _configService = inject(AppConfigService);

  constructor() {
    this.initialize();
  }

  initialize() {
    this._translate.addLangs(this._configService.config().languages.availables);
  }

  useLang(language?: string) {
    if (!language) return;
    this._translate.setDefaultLang(language);
    this._translate.use(language);
  }

  get(key: string | string[], params?: Record<string, any>) {
    return this._translate.get((key), params)
  }

  getValidationsErrors(errors: ValidationErrors | null) {
    if (!errors) return of("");
    const error = Object.keys(errors)[0];
    return this.get(`errors.validations.${error}`, errors[error])
  }

  gethttpStatusErrors(httpStatusCode: string): Observable<HttpStatus |  null> {
    if (!httpStatusCode) return of(null);
    return this.get(`errors.httpStatus.${httpStatusCode}`)
  }

}
