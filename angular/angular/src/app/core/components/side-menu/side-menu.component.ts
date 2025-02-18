import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { ItemMenuComponent } from "../item-menu/item-menu.component";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Route, Routes } from '@angular/router';
import { SharedImageComponent } from "@shared/components/image/shared-image.component";
import { ThemeItemMenuComponent } from "../theme-item-menu/theme-item-menu.component";

@Component({
  selector: 'core-side-menu',
  imports: [ItemMenuComponent, SharedImageComponent, NgbCollapseModule, ThemeItemMenuComponent],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent {

  public routes = input.required<Routes>();

  public onCollapsed = output<boolean>();

  public getRoutes = computed<Route[]>(() => this.routes().filter((route) => route && route.title) )

  // effect = effect(() => console.log(this.getRoutes()))

  private _isCollapsed = signal<boolean>(true);

  get isCollapsed(): boolean {
    return this._isCollapsed();
  }

  set isCollapsed(value: boolean) {
    this._isCollapsed.set(value);
  }

  public toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.onCollapsed.emit(this.isCollapsed);
  }


}
