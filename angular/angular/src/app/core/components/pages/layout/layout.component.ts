import { Component, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '@core/components/side-menu/side-menu.component';
import { featuresRoutes } from '@features/features.routes';
import { VERSION } from '@angular/core';
import { BreadcrumbComponent } from '@core/components/breadcrumb/breadcrumb.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from "../../spinner/spinner.component";

@Component({
  selector: 'core-layout',
  imports: [RouterOutlet, SideMenuComponent, BreadcrumbComponent, NgbCollapseModule, SpinnerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

  public readonly routes = featuresRoutes

  public readonly version = VERSION.full

  protected isCollapsed = model<boolean>(false);

  protected toggleCollapse() {
    this.isCollapsed.update((isCollapsed) => !isCollapsed)
  }

}
