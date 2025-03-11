import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';


import {
  delay,
  forkJoin,
  map,
  Observable,
  of,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { Gender, Product, ProductsResponse } from '../interfaces/product.interface';
import { User } from '../../auth/interfaces/user.interface';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { Api } from '@core/interfaces/config/config';

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User,
};

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly _apiHandler = inject(ApiHandlerService);

  private readonly _configService = inject(AppConfigService);

  private _configApi = signal<Api | null>(null);

  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._configApi.set(this._configService.config().apis["tesloshop"]);
  }

  private getEndpoint(endpoint: string): string {
    const configApi = this._configApi();
    if (!configApi) return "";
    return `${configApi.baseUrl}${configApi.endpoints[endpoint]}`;
  }

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`; // 9-0-''
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    const url = this.getEndpoint("getProducts");
    return this._apiHandler.get<ProductsResponse>(url, {
      params: {
        limit,
        offset,
        gender,
      },
    }).pipe(
      tap((resp) => console.log(resp)),
      tap((resp) => this.productsCache.set(key, resp))
    );

  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    const url = this.getEndpoint("getProductByIdSlug");
    return this._apiHandler.get<Product>(url,
      { pathParams: {idSlug} }
    ).pipe(tap((product) => this.productCache.set(idSlug, product)));

  }

  getProductById(id: string): Observable<Product> {
    if (id === 'new') {
      return of(emptyProduct);
    }

    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }

    const url = this.getEndpoint("getProductById");
    return this._apiHandler.get<Product>(url,
      { pathParams: {id} }
    ).pipe(tap((product) => this.productCache.set(id, product)));
  }

  updateProduct(
    id: string,
    productLike: Partial<Product>,
    imageFileList?: FileList
  ): Observable<Product> {
    const currentImages = productLike.images ?? [];

    const url = this.getEndpoint("updateProduct");
    return this.uploadImages(imageFileList).pipe(
      map((imageNames) => ({
        ...productLike,
        images: [...currentImages, ...imageNames],
      })),
      switchMap((updatedProduct) =>
        this._apiHandler.patch<Product>(url, updatedProduct, {pathParams: {id}})
      ),
      tap((product) => this.updateProductCache(product))
    );

    // return this.http
    //   .patch<Product>(`${baseUrl}/products/${id}`, productLike)
    //   .pipe(tap((product) => this.updateProductCache(product)));
  }

  createProduct(
    productLike: Partial<Product>,
    imageFileList?: FileList
  ): Observable<Product> {

    const url = this.getEndpoint("createProduct");
    return this._apiHandler
      .post<Product>(url, productLike)
      .pipe(tap((product) => this.updateProductCache(product)));
  }

  updateProductCache(product: Product) {
    const productId = product.id;

    this.productCache.set(productId, product);

    this.productsCache.forEach((productResponse) => {
      productResponse.products = productResponse.products.map(
        (currentProduct:any) =>
          currentProduct.id === productId ? product : currentProduct
      );
    });

    console.log('Caché actualizado');
  }

  // Tome un FileList y lo suba
  uploadImages(images?: FileList): Observable<string[]> {
    if (!images) return of([]);

    const uploadObservables = Array.from(images).map((imageFile) =>
      this.uploadImage(imageFile)
    );

    return forkJoin(uploadObservables).pipe(
      tap((imageNames) => console.log({ imageNames }))
    );
  }

  uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile);

    const url = this.getEndpoint("uploadImage");
    return this._apiHandler
      .post<{ fileName: string }>(url, formData)
      .pipe(map((resp) => resp.fileName));
  }
}
