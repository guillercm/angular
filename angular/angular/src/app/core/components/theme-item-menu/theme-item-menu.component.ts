import { Component, inject, signal } from '@angular/core';
import { Theme } from '@core/interfaces/theme/theme.type';
import { ThemeService } from '@core/services/theme/theme.service';
import { SharedClickOutsideDirective } from '@shared/directives/click-outside/shared-click-outside.directive';

@Component({
  selector: 'core-theme-item-menu',
  imports: [SharedClickOutsideDirective],
  templateUrl: './theme-item-menu.component.html',
  styleUrl: './theme-item-menu.component.css'
})
export class ThemeItemMenuComponent {

  private readonly _themeService = inject(ThemeService);

  private _isCollapsed = signal<boolean>(true);
  public readonly isCollapsed = this._isCollapsed.asReadonly();

  public theme = this._themeService.theme

  public toggleCollapse() {
    this._isCollapsed.update((value: boolean) => !value)
  }

  public setTheme(theme: Theme) {
    this._themeService.setTheme(theme);
    this._isCollapsed.set(true);
  }

  public onClickOutside(clickOutside: any) {
    if (clickOutside) this._isCollapsed.set(true);
  }
}
