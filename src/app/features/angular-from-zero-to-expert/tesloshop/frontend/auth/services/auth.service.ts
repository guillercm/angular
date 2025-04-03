import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

import { AuthResponse } from '../interfaces/auth-response.interface';
import { Api } from '@core/interfaces/config/config';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { TokenService } from './token.service';
import { UserContextService } from './user-context.service';
import { AuthStatus } from '../interfaces/auth-status.interface';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly _apiHandlerService = inject(ApiHandlerService);

  private readonly _configService = inject(AppConfigService);

  private readonly _tokenService = inject(TokenService);

  private readonly _userContextService = inject(UserContextService);

  private _configApi = signal<Api | null>(null);

  private _authStatus = signal<AuthStatus>('checking');

  public readonly token = computed(() => this._tokenService.token())

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._configApi.set(this._configService.config().apis["tesloshop"]);
  }

  private getEndpoint(endpoint: string): string {
    return this._apiHandlerService.getEndpoint(this._configApi, endpoint)
  }

  public checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';

    if (this._userContextService.isAuthenticated()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  public login(email: string, password: string): Observable<boolean> {
    const url = this.getEndpoint("login");

    return this._apiHandlerService.post<AuthResponse>(url, {
      email, password,
    }).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    );
  }

  public register(email: string, password: string, fullName: string) {
    const url = this.getEndpoint("register");
    return this._apiHandlerService.post<AuthResponse>(url, {
      email, password, fullName
    }).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    );
  }

  public checkStatus(): Observable<boolean> {
    const token = this.token();

    if (!token) {
      this.logout();
      return of(false);
    }

    const url = this.getEndpoint("checkStatus");
    return this._apiHandlerService.get<AuthResponse>(url, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError((error: any) => this.handleAuthError(error))
    );

  }

  public logout() {
    this._userContextService.removeUser();
    this._authStatus.set('not-authenticated');
    this._tokenService.removeToken();
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._userContextService.setUser(user);
    this._authStatus.set('authenticated');
    this._tokenService.setToken(token);
    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }
}
