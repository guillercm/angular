import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonHandlerService {

  constructor() { }

  parse<T>(textOfObject: string, defaultValue: T | null = null, reviver?: (this: any, key: string, value: any) => any): T | null {
    try {
      const json = JSON.parse(textOfObject, reviver);
      if (defaultValue === null || typeof defaultValue === typeof json) return json;
    } catch {}
    return defaultValue;
  }

  stringify(object: object, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string | null {
    try {
      return JSON.stringify(object, replacer, space);
    } catch {}
    return null;
  }

}
