import { Injectable } from '@angular/core';
import { isLocalStorageAvailable } from '@core/decorators/is-local-storage-available.decorator';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  @isLocalStorageAvailable()
  public setItem(key: string, value: any) {
    switch (typeof value) {
      case "object":
        value = JSON.stringify(value);
        break;
    }
    localStorage.setItem(key, value.toString());
  }

  @isLocalStorageAvailable()
  public getItem<T>(key: string, defaultValue: T | null = null): T {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue as T;
    switch (typeof defaultValue) {
      case 'number':
        return Number(value) as T;
      case 'bigint':
        return BigInt(value) as T;
      case 'boolean':
        return (value === 'true' ? true : false) as T;
      case 'object':
        try {
          const json = JSON.parse(value);
          if (typeof json === "object") return json;
        } catch {
          return defaultValue as T;
        }
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
