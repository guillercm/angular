import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';
import { ProductCardComponent } from "./ui/product-card/product-card.component";
import { Product } from '@interfaces/product';
import { interval, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input-output',
  imports: [CommonModule, TitleComponent, ProductCardComponent],
  templateUrl: './input-output.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class InputOutputComponent {

  private destroyRef = inject(DestroyRef);

  public products = signal<Product[]>([{
    id: 1,
    name: "Producto",
    quantity: 0
  },
  {
    id: 2,
    name: "Producto 2",
    quantity: 0
  }]);

  private intervalSubscription = interval(1000).pipe(
    takeUntilDestroyed(this.destroyRef),
    tap(() => {
      this.products.update((products: Product[]) => [...products, {
        id: products.length + 1,
        name: `producto ${products.length + 1}`,
        quantity: 0
      }]

      )
    }),
    take(7)
  ).subscribe();

  public updateProduct(product: Product, quantity: number) {
    this.products.update((products) => products.map((p) => p.id === product.id ? {...p, quantity: quantity} : p))
  }
}
