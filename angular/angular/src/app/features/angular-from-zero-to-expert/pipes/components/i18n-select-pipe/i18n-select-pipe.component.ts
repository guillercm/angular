import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';

@Component({
  selector: 'features-pipes-i18n-select-pipe',
  imports: [CommonModule, SharedButtonComponent],
  templateUrl: './i18n-select-pipe.component.html',
  styleUrl: './i18n-select-pipe.component.css'
})
export class I18nSelectPipeComponent {
  private _guestName = signal<string>('Javier');
  protected readonly guestName = this._guestName.asReadonly();

  private _gender = signal<'male' | 'female'>('male');
  protected readonly gender = this._gender.asReadonly();

  protected readonly invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  protected changeClient(): void {
    this._guestName.update(() => {
      if (this.gender() === 'male') {
        this._gender.set('female');
        return 'Samira';
      }
      this._gender.set('male');
      return 'Javier';
    })
  }
}
