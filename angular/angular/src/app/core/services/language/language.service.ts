import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AvailableLanguages } from '@core/types/language/availableLanguages.type';
import { InterpolatableTranslationObject, InterpolationParameters, TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly _translate = inject(TranslateService);

  private readonly _availableLanguages: AvailableLanguages[] = ['es']

  constructor() {
    this.initialize();
  }

  initialize() {
    this._translate.addLangs(this._availableLanguages);
  }

  useLang(language: AvailableLanguages) {
    this._translate.setDefaultLang(language);
    this._translate.use(language);
  }

  get(key: string | string[], params?: Record<string, any>) {
    return toSignal(this._translate.get((key), params))
  }

}
