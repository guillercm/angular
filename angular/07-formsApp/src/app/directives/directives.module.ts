import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { DirectivesRoutingModule } from './directives-routing.module';


@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesRoutingModule,
    SharedModule,
  ]
})
export class DirectivesModule { }
