import { AsyncPipe, I18nPluralPipe } from '@angular/common';
import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { GenericObject } from '@core/interfaces/generic-object/generic-object.interface';
import { InterpolationParameters, TranslateService } from '@ngx-translate/core';
import { combineLatest, distinctUntilChanged, forkJoin, map, merge, Observable, startWith, switchMap, tap } from 'rxjs';
import { AppConfigService } from '../configuration/app-config.service';
import { rxResource, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { I18nPluralService } from '../i18nPlural/i18n-plural.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { CookiesService } from '../session/cookies.service';


@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _cookiesService = inject(CookiesService);

  private readonly _configService = inject(AppConfigService);

  private readonly _translate = inject(TranslateService);

  private readonly _i18nPluralService = inject(I18nPluralService);

  private _currentLang = signal("");
  public readonly currentLang = this._currentLang.asReadonly();

  public readonly changesLangObservables = [
    this._translate.onDefaultLangChange,
    this._translate.onTranslationChange,
    this._translate.onLangChange.pipe(startWith(null))
  ]

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._translate.addLangs(this._configService.config().languages.availables);
  }

  public useLang(language?: string) {
    if (!language) return;
    this._currentLang.set(language);
    this._translate.use(language);
    this._cookiesService.set('lang', language)
  }

  initializeLang() {
    const cookie = this._cookiesService.get('lang', this._configService.config().languages.default);
    this.useLang(cookie);
  }


  public handlePlurals(number: number, value: any) {
    const i18nPluralvalue = this._i18nPluralService.get(number, value);
    if (i18nPluralvalue === null) return value;
    return i18nPluralvalue;
  }

  public getTranslate(key: string | string[], interpolateParams?: InterpolationParameters) {
    return this._translate.get(key, interpolateParams);
  }

  public getValueForPlurals(interpolateParams?: InterpolationParameters) {
    let number = 0;
    if (interpolateParams && typeof interpolateParams === 'object') {
      const array = Object.values(interpolateParams);
      if (array.length) number = array[0];
    }
    return number;
  }

  public get(key: string | string[], interpolateParams?: GenericObject) {
    let signalValue = signal<any>("")
    let number = this.getValueForPlurals(interpolateParams);
    merge(
      ...this.changesLangObservables,
    ).pipe(
      takeUntilDestroyed(this._destroyRef),
      switchMap(() => this.getTranslate(key, interpolateParams)),
      map((value: any) => this.handlePlurals(number, value))
    ).subscribe((value) => {
      signalValue.set(value);
    });
    return signalValue
  }

  public getValue(key: string | string[], interpolateParams?: GenericObject) {
    let number = this.getValueForPlurals(interpolateParams);
    return this.handlePlurals(number, this._translate.instant(key, interpolateParams));
  }
}
