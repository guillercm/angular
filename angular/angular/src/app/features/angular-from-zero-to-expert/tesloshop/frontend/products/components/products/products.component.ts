import { Component, input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductCardComponent } from "../product-card/product-card.component";
import { AppTranslatePipe } from "@core/pipes/app-translate.pipe";

@Component({
  selector: 'products',
  imports: [ProductCardComponent, AppTranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  public products = input.required<Product[]>();
}
