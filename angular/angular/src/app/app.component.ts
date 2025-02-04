import { CommonModule } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from '@core/services/language/language.service';
import { ThemeService } from '@core/services/theme/theme.service';
import { TranslateService, TranslatePipe, TranslateDirective } from "@ngx-translate/core";
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, TranslateDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private readonly _themeService = inject(ThemeService);

  private readonly _translate = inject(TranslateService);

  private readonly _languageService = inject(LanguageService );

  public readonly theme = this._themeService.theme

  title = signal<string>('Angular');

  translatedText: Signal<string>;

  translatedText2: Signal<string>;

  getTranslation(key: string, params?: Record<string, any>) {
    return this._languageService.get(`app.${key}`, params)
  }

  constructor() {
    this._languageService.useLang('es');
    this.translatedText = this.getTranslation("title")
    this.translatedText2 = this.getTranslation("message")
  }




}
