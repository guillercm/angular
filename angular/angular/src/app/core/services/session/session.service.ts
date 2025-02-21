import { Injectable, inject } from '@angular/core';
import { isLocalStorageAvailable } from '@core/decorators/is-local-storage-available.decorator';
import { JsonHandlerService } from '../json-handler/json-handler.service';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly _jsonHandler = inject(JsonHandlerService);

  @isLocalStorageAvailable()
  public setItem(key: string, value: any) {
    if (typeof value === "object") value = this._jsonHandler.stringify(value);
    localStorage.setItem(key, value.toString());
  }

  @isLocalStorageAvailable()
  public getItem<T>(key: string, defaultValue: T | null = null): T | null {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;
    switch (typeof defaultValue) {
      case 'number':
        return Number(value) as T;
      case 'bigint':
        return BigInt(value) as T;
      case 'boolean':
        return (value === 'true' ? true : false) as T;
      case 'object':
        const json = this._jsonHandler.parse<T>(value, defaultValue);
        if (typeof json === "object") return json;
        return defaultValue;
    }
    return value as T;
  }

  @isLocalStorageAvailable()
  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  @isLocalStorageAvailable()
  clear() {
    localStorage.clear();
  }
}
