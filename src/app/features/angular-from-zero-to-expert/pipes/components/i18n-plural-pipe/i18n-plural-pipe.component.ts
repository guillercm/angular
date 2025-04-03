import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';

@Component({
  selector: 'features-pipes-i18n-plural-pipe',
  imports: [CommonModule, SharedButtonComponent],
  templateUrl: './i18n-plural-pipe.component.html',
  styleUrl: './i18n-plural-pipe.component.css'
})
export class I18nPluralPipeComponent {
  private _numberOfGuests = signal<number>(3);
  protected readonly numberOfGuests = this._numberOfGuests.asReadonly();

  protected readonly guestMap = {
    '=0': 'no tenemos ningún invitado esperando.',
    '=1': 'tenemos un invitado esperando.',
    '=2': 'tenemos dos invitados esperando.',
    'other': 'tenemos # invitados esperando.',
  }


  increaseNumberOfGuestsBy(increment: number) {
    this._numberOfGuests.update((value) => (value + increment) < 0 ? 0 : (value + increment))
  }
}
