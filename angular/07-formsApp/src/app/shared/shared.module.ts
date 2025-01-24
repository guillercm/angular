import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { CustomLabelDirective } from './directives/custom-label.directive';



@NgModule({
  declarations: [
    SideMenuComponent,
    MenuItemComponent,
    CustomLabelDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideMenuComponent,
    CustomLabelDirective
  ]
})
export class SharedModule { }
