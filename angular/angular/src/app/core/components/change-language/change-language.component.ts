import { CommonModule } from '@angular/common';
import { Component, inject, model, effect } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { AppTranslatePipe } from "../../pipes/app-translate.pipe";
import { AppTranslateService } from '@core/services/translate/app-translate.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'core-change-language',
  imports: [CommonModule, MatRadioModule, AppTranslatePipe, FormsModule],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.css'
})
export class ChangeLanguageComponent {

  private readonly _appTranslateService = inject(AppTranslateService);

  public language = model<string>(this._appTranslateService.currentLang() || 'es');

  protected readonly languages = ['es', 'en']

  constructor() {
    effect(() => {
      this._appTranslateService.useLang(this.language());
    })
  }

}
