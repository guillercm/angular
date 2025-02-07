import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { InterpolatableTranslationObject, InterpolationParameters, TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { AppConfigService } from '../configuration/app-config.service';


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
    return toSignal(this._translate.get((key), params))
  }

}
