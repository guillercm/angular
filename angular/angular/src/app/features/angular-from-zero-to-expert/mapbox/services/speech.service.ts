import { computed, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  private readonly _synth = computed(() => window.speechSynthesis)

  public speak(text: string) {
    const synth = this._synth();
    if (!synth) return;
    synth.cancel();
    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  }

  public cancel() {
    const synth = this._synth();
    if (!synth) return;
    synth.cancel();
  }

}
