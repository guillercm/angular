### Escribir y leer cookies

[ngx-cookie-service-ssr](https://www.npmjs.com/package/ngx-cookie-service-ssr)


<code-block>
  <details>
  <summary>cookies.service.ts</summary>

  ```typescript
    import { Injectable, inject } from '@angular/core';
    import { SsrCookieService } from 'ngx-cookie-service-ssr';

    @Injectable({
    providedIn: 'root'
    })
    export class CookiesService {

    private readonly _ssrCookiesService = inject(SsrCookieService);

    public get(name: string, defaultValue: any = "") {
        return this._ssrCookiesService.get(name) || defaultValue;
    }

    public set(name: string, value: string) {
        this._ssrCookiesService.set(name, value);
    }

    }

  ```
  </details>
</code-block>