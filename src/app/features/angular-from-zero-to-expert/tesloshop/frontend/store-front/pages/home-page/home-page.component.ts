import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ProductsService } from '../../../products/services/products.service';
import { ProductsComponent } from "../../../products/components/products/products.component";
import { AppTranslatePipe } from "@core/pipes/app-translate.pipe";
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { PaginationService } from '@core/services/paginator/pagination.service';


@Component({
  selector: 'app-home-page',
  imports: [PaginationComponent, ProductsComponent, AppTranslatePipe],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  activatedRoute = inject(ActivatedRoute);

  genders = ['men', 'women', 'kid', null, undefined]

  gender = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => params.get('gender')),
      map((gender) => gender && this.genders.includes(gender) ? gender : undefined)
    )
  )

  productsResource = rxResource({
    request: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1
    }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        gender: this.gender(),
        offset: request.page * 9,
      });
    },
  });
}
