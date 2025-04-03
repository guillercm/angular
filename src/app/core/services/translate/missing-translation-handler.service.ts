import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MissingTranslationHandlerService implements MissingTranslationHandler {

  handle(params: MissingTranslationHandlerParams) {
    let [i18n, type, key3 = '', key4 = '', key5 = ''] = params.key.split('.');
    switch (type) {
      case 'common':
        if (key3 === 'errors' && key4 === 'httpStatus') {
          key5 = 'generic';
        }
        break;
      case 'features':

        break;
      default:
        break;
    }
    const newKey = [i18n, type, key3, key4, key5].join('.');
    return newKey
  }
}
