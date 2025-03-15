import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from "@environments/environments";
import { SessionService } from '@core/services/session/session.service';
import { User } from '../interfaces/user.interface';

const defaultUser = null;

@Injectable({
  providedIn: 'root',
})
export class UserContextService {
  private readonly _user = signal<User | null>(null);
  public readonly user = this._user.asReadonly();

  public readonly isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

  public readonly isAuthenticated = computed(() => this._user() !== null);

  constructor() {}

  setUser(user: User | null) {
    this._user.set(user);
  }

  removeUser() {
    this._user.set(null);
  }

  hasRole(role: string): boolean {
    const user = this._user();
    return user ? user.roles.includes(role) : false;
  }
}
