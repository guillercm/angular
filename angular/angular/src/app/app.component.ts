import { CommonModule } from '@angular/common';
import { Component, effect, EnvironmentInjector, inject, Renderer2, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { LanguageService } from '@core/services/language/language.service';
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private readonly _configService = inject(AppConfigService);

  private readonly _themeService = inject(ThemeService);

  private readonly _renderer = inject(Renderer2);

  private readonly _languageService = inject(LanguageService);

  public readonly environmentInjector = inject(EnvironmentInjector);

  public readonly theme = this._themeService.theme

  title = signal<string>('Angular');

  effectTheme = effect(() => this._renderer.setAttribute(document.documentElement, 'data-bs-theme', this.theme()))

  getTranslation(key: string, params?: Record<string, any>) {
    return this._languageService.get(`app.${key}`, params)
  }

  constructor() {
    this._languageService.useLang(this._configService.config().languages.default);
  }

}
