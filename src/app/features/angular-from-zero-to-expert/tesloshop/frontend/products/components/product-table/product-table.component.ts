import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductImagePipe } from '../../pipes/product-image.pipe';
import { Product } from '../../interfaces/product.interface';
import { SharedImageComponent } from "@shared/components/image/shared-image.component";
import { AppTranslatePipe } from "@core/pipes/app-translate.pipe";


@Component({
  selector: 'product-table',
  imports: [ProductImagePipe, RouterLink, CurrencyPipe, SharedImageComponent, AppTranslatePipe],
  templateUrl: './product-table.component.html',
})
export class ProductTableComponent {
  products = input.required<Product[]>();
}
