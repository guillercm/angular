import { Injectable } from '@angular/core';
import { TranslateFakeLoader, TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService extends TranslateFakeLoader {
  public override getTranslation(lang: string): Observable<TranslationObject> {
    console.log({lang})
    return super.getTranslation(lang)
  }

}
