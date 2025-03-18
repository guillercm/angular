import { Injectable } from '@angular/core';
import { InterpolatableTranslationObject, TranslateCompiler, TranslateFakeCompiler, Translation } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CompilerService extends TranslateFakeCompiler {

  public override compile(value: string, lang: string) {
    return super.compile(value, lang)
  }
  public override compileTranslations(translations: Translation, lang: string): InterpolatableTranslationObject {
    console.log({translations})
    return super.compileTranslations(translations, lang)
  }
}
