import { Component, input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  public products = input.required<Product[]>();
}
