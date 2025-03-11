import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { AuthResponse } from '../interfaces/auth-response.interface';
import { Api } from '@core/interfaces/config/config';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { User } from '../interfaces/user.interface';
import { TokenService } from './token.service';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly _apiHandler = inject(ApiHandlerService);

  private readonly _configService = inject(AppConfigService);

  private readonly _tokenService = inject(TokenService);

  private _configApi = signal<Api | null>(null);

  private _authStatus = signal<AuthStatus>('checking');

  private _user = signal<User | null>(null);
  public readonly user = this._user.asReadonly();

  public readonly isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

  public readonly token = computed(() => this._tokenService.token() )

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._configApi.set(this._configService.config().apis["tesloshop"]);
  }

  private getEndpoint(endpoint: string): string {
    const configApi = this._configApi();
    if (!configApi) return "";
    return `${configApi.baseUrl}${configApi.endpoints[endpoint]}`;
  }

  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._user()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });



  login(email: string, password: string): Observable<boolean> {
    const url = this.getEndpoint("login");

    return this._apiHandler.post<AuthResponse>(url, {
      email: email,
      password: password,
    }).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    );
  }

  checkStatus(): Observable<boolean> {
    const token = this.token();

    if (!token) {
      this.logout();
      return of(false);
    }

    const url = this.getEndpoint("checkStatus");

    return this._apiHandler.get<AuthResponse>(url, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    );

  }

  logout() {
    this._user.set(null);
    this._authStatus.set('not-authenticated');
    this._tokenService.removeToken();
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {

    this._user.set(user);
    this._authStatus.set('authenticated');
    this._tokenService.setToken(token);

    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }
}
