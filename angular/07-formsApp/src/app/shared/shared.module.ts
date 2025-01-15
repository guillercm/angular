import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from './components/menu-item/menu-item.component';



@NgModule({
  declarations: [
    SideMenuComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SideMenuComponent
  ]
})
export class SharedModule { }
