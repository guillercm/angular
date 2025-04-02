import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';


import { ProductTableComponent } from '../../../products/components/product-table/product-table.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../products/services/products.service';
import { AppTranslatePipe } from "@core/pipes/app-translate.pipe";
import { PaginationService } from '@core/services/paginator/pagination.service';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, PaginationComponent, RouterLink, AppTranslatePipe],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  private readonly _productsService = inject(ProductsService);
  private readonly _paginationService = inject(PaginationService);
  protected readonly currentPage = this._paginationService.currentPage;

  productsPerPage = signal(10);

  productsResource = rxResource({
    request: () => ({
      page: this._paginationService.currentPage() - 1,
      limit: this.productsPerPage(),
    }),
    loader: ({ request }) => {
      return this._productsService.getProducts({
        offset: request.page * 9,
        limit: request.limit,
      });
    },
  });
}
