import { Component, computed } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { SideMenuComponent } from '@core/components/side-menu/side-menu.component';
import { featuresRoutes } from '@features/features.routes';
import { VERSION } from '@angular/core';
import { BreadcrumbComponent } from '@core/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'core-layout',
  imports: [RouterOutlet, SideMenuComponent, BreadcrumbComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

  public readonly ROUTES = featuresRoutes

  public readonly VERSION = VERSION.full

}
