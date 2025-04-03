import { inject, Pipe, PipeTransform, signal } from '@angular/core';
import { AppConfigService } from '@core/services/configuration/app-config.service';

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {

  private readonly _configService = inject(AppConfigService);

  private _baseApiUrl = signal<string | null>(null);

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._baseApiUrl.set(this._configService.config().apis["tesloshop"].baseUrl);
  }

  transform(value: null | string | string[]): string {
    if (!value === null) return "";

    if (typeof value === 'string') {
      if (value.startsWith('blob:')) return value;
      return `${this._baseApiUrl()}/files/product/${value}`;
    }

    return "";

  }
}
