import { inject, Injectable, signal } from '@angular/core';
import { Theme } from '../../types/theme/theme.type';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly _sessionService = inject(SessionService);

  private readonly _defaultTheme: Theme = "light";

  private _theme = signal<Theme>(this._defaultTheme);
  public theme = this._theme.asReadonly();

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._theme.set(this._sessionService.getItem<Theme>("theme", this._defaultTheme))
  }

  public setTheme(newTheme: Theme) {
    this._theme.set(newTheme);
    this._sessionService.setItem("theme", newTheme)
  }

}
