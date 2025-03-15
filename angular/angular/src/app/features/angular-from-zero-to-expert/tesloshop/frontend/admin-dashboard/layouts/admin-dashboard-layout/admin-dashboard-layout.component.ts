import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { SharedButtonComponent } from "@shared/components/button/shared-button.component";
import { UserContextService } from '../../../auth/services/user-context.service';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, SharedButtonComponent],
  templateUrl: './admin-dashboard-layout.component.html',
})
export class AdminDashboardLayoutComponent {
  private _authService = inject(AuthService);
  private _userContextServiceService = inject(UserContextService);

  private readonly _activatedRoute = inject(ActivatedRoute);

  private readonly _router = inject(Router);

  protected readonly user = computed(() => this._userContextServiceService.user());

  protected logout() {
    this._authService.logout();
    return this._router.navigate(['../'], { relativeTo: this._activatedRoute });
  }
}
