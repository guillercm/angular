import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
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

  public collapsed = output<boolean>();

  protected readonly getRoutes = computed<Route[]>(() => this.routes().filter((route) => route && route.title) )

  public isCollapsed = model<boolean>(true);

  public toggleCollapse() {
    this.isCollapsed.update((isCollapsed) => !isCollapsed)
    this.collapsed.emit(this.isCollapsed());
  }

  navigate() {
    if (!this.isCollapsed) this.toggleCollapse();
  }
}
