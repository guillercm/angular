import { I18nPluralPipe } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class I18nPluralService {

  private readonly _i18nPluralPipe = inject(I18nPluralPipe);

  get(value: number, pluralMap: {
    [count: string]: string;
  }, locale?: string): string | null {
    return typeof pluralMap === 'object' &&
      (typeof pluralMap["=0"] === 'string' || typeof pluralMap["=1"] === 'string') ? this._i18nPluralPipe.transform(value, pluralMap, locale) : null
  }

  constructor() { }
}
