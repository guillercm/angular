import { AsyncPipe, I18nPluralPipe } from '@angular/common';
import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { GenericObject } from '@core/interfaces/generic-object/generic-object.interface';
import { InterpolationParameters, TranslateService } from '@ngx-translate/core';
import { combineLatest, distinctUntilChanged, forkJoin, map, merge, Observable, startWith, switchMap, tap } from 'rxjs';
import { AppConfigService } from '../configuration/app-config.service';
import { rxResource, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';


@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _configService = inject(AppConfigService);

  private readonly _translate = inject(TranslateService);

  private readonly _i18nPluralPipe = inject(I18nPluralPipe);

  public readonly changesLangObservables = [
    this._translate.onDefaultLangChange,
    this._translate.onTranslationChange,
    this._translate.onLangChange.pipe(startWith(null))
  ]

  constructor() {
    this.initialize();
  }

  initialize() {
    this._translate.addLangs(this._configService.config().languages.availables);
  }

  useLang(language?: string) {
    if (!language) return;
    // this._translate.setDefaultLang(language);
    this._translate.use(language);
  }


  public handlePlurals(value: any, number: number) {
    console.log(value)
    return !isNaN(number) &&
      typeof value === 'object' &&
      (typeof value["=0"] === 'string' || typeof value["=1"] === 'string')
      ? this._i18nPluralPipe.transform(number, value)
      : value;
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
    let signalValue = signal("")
    let number = this.getValueForPlurals(interpolateParams);
    merge(
      ...this.changesLangObservables,
    ).pipe(
      takeUntilDestroyed(this._destroyRef),
      switchMap(() => this.getTranslate(key, interpolateParams)),
      map((value: any) => this.handlePlurals(value, number))
    ).subscribe((value) => {
      signalValue.set(value);
    });
    return signalValue
  }
}
