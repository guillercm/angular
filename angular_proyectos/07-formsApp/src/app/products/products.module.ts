import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './pages/product/product.component';
import { PriceComponent } from './components/price/price.component';
import { LifeCycleHooksComponent } from './components/life-cycle-hooks/life-cycle-hooks.component';
import { LifeCycleHookChildComponent } from './components/life-cycle-hook-child/life-cycle-hook-child.component';


@NgModule({
  declarations: [
    ProductComponent,
    PriceComponent,
    LifeCycleHooksComponent,
    LifeCycleHookChildComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
