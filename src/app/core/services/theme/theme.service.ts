import { inject, Injectable, signal } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Theme } from '@core/interfaces/theme/theme.type';
import { CookiesService } from '../session/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly _sessionService = inject(SessionService);

  private readonly _cookiesService = inject(CookiesService);

  private readonly _defaultTheme: Theme = "light";

  private _theme = signal<Theme>(this._defaultTheme);
  public readonly theme = this._theme.asReadonly();

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._theme.set(this._cookiesService.get("theme", this._sessionService.getItem<Theme>("theme", this._defaultTheme) || this._defaultTheme));
  }

  public setTheme(newTheme: Theme) {
    this._theme.set(newTheme);
    this._sessionService.setItem("theme", newTheme);
    this._cookiesService.set("theme", newTheme);
  }

}
