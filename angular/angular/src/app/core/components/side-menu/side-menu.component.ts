import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { ItemMenuComponent } from "../item-menu/item-menu.component";
import { Route, Routes } from '@angular/router';
import { ImageComponent } from "../../../shared/components/image/image.component";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeItemMenuComponent } from "../theme-item-menu/theme-item-menu.component";

@Component({
  selector: 'core-side-menu',
  imports: [ItemMenuComponent, ImageComponent, NgbCollapseModule, ThemeItemMenuComponent],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent {


  public routes = input.required<Routes>();

  public getRoutes = computed<Route[]>(() => this.routes().filter((route) => route && route.path !== "**") )

  effect = effect(() => console.log(this.getRoutes()))


}
