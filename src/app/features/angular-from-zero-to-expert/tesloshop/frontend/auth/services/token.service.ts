import { inject, Injectable, signal } from '@angular/core';
import { SessionService } from '@core/services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly _sessionService = inject(SessionService);

  private _token = signal<string | null>(null);

  public readonly token = this._token.asReadonly();

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._token.set(this._sessionService.getItem("token"));
  }

  public setToken(token: string | null) {
    this._token.set(token);
    this._sessionService.setItem("token", token);
  }

  public removeToken() {
    this._token.set(null);
    this._sessionService.removeItem("token");
  }
}
