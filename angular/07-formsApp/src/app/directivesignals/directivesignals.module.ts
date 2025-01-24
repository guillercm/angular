import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesignalsRoutingModule } from './directivesignals-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductPageComponent } from './pages/product-page/product-page.component';


@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesignalsRoutingModule,
    SharedModule,
  ]
})
export class DirectivesignalsModule { }
