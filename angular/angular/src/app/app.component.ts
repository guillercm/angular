import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, effect, EnvironmentInjector, inject, PLATFORM_ID, Renderer2, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { AppTranslateService } from '@core/services/translate/app-translate.service';
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  protected readonly isPlatformBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  title = signal<string>('Angular');

  private readonly _configService = inject(AppConfigService);

  private readonly _themeService = inject(ThemeService);

  private readonly _renderer = inject(Renderer2);

  private readonly _appTranslateService = inject(AppTranslateService);

  public readonly environmentInjector = inject(EnvironmentInjector);

  public readonly theme = this._themeService.theme;

  private document = inject(DOCUMENT);


  effectTheme = effect(() =>{this._renderer.setAttribute(this.document.documentElement, 'data-bs-theme', this.theme())})

  constructor() {
    this._appTranslateService.useLang(this._configService.config().languages.default);
  }

}
