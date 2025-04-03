import { computed, inject, Injectable } from '@angular/core';
import { AppTranslateService } from '@core/services/translate/app-translate.service';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  private readonly _synth = computed(() => window.speechSynthesis)

  private readonly _appTranslateService = inject(AppTranslateService);

  private readonly _language = computed(() => this._appTranslateService.currentLang() )

  public speak(text: string) {
    const synth = this._synth();
    if (!synth) return;
    synth.cancel();
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang = this._language();
    synth.speak(utterThis);
  }

  public cancel() {
    const synth = this._synth();
    if (!synth) return;
    synth.cancel();
  }

}
