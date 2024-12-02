import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { BasicsPageComponent } from './pages/basics-page/basics-page.component';
import { NumbersPageComponent } from './pages/numbers-page/numbers-page.component';
import { UncommonPageComponent } from './pages/uncommon-page/uncommon-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { OrderComponent } from './pages/order/order.component';
import { CanFlyPipe } from './pipes/can-fly.pipe';
import { ToggleCasePipe } from './pipes/toggle-case.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { HeroColorPipe } from './pipes/hero-color.pipe';


@NgModule({
  declarations: [
    ProductsComponent,
    BasicsPageComponent,
    NumbersPageComponent,
    UncommonPageComponent,
    OrderComponent,

    // Pipes
    CanFlyPipe,
    ToggleCasePipe,
    SortByPipe,
    HeroColorPipe,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PrimeNgModule
  ]
})
export class ProductsModule { }
// ng g m products --module app --route products
