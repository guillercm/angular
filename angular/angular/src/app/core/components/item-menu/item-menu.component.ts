import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Route, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'core-item-menu',
  imports: [CommonModule, RouterModule, NgbCollapseModule],
  templateUrl: './item-menu.component.html',
  styleUrl: './item-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemMenuComponent {

  public readonly route = input.required<Route>();

  public readonly index = input.required<number>();

  private _isCollapsed = signal<boolean>(false);

  get isCollapsed(): boolean {
    return this._isCollapsed();
  }

  set isCollapsed(value: boolean) {
    this._isCollapsed.set(value);
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    console.log(this.route())
  }
}
