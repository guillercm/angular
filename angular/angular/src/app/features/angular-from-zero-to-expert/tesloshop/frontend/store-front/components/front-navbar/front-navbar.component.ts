import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UserContextService } from '../../../auth/services/user-context.service';
import { AppTranslatePipe } from "../../../../../../../core/pipes/app-translate.pipe";

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive, NgbCollapseModule, NgbDropdownModule, AppTranslatePipe],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent {
  private readonly _authService = inject(AuthService);

  private readonly _userContextServiceService = inject(UserContextService);

  private _isCollapsed = signal<boolean>(false);

  protected readonly authStatus = computed(() => this._authService.authStatus() )

  protected readonly user = computed(() => this._userContextServiceService.user() )

  protected readonly isAdmin = computed(() => this._userContextServiceService.isAdmin() )

  get isCollapsed(): boolean {
    return this._isCollapsed();
  }

  set isCollapsed(value: boolean) {
    this._isCollapsed.set(value);
  }

  protected toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  protected logout() {
    this._authService.logout();
  }
}
