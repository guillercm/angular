## Configuración

Deberemos de hacer las siguientes configuraciones en el fichero de configuración de la aplicación:

<code-block>
  <span>app.config.ts</span>

  ```typescript
  import {ApplicationConfig, provideZoneChangeDetection} from "@angular/core";
  import {provideHttpClient} from "@angular/common/http";
  import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
  import {TranslateHttpLoader} from '@ngx-translate/http-loader';
  import {HttpClient} from '@angular/common/http';

  const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) => new TranslateHttpLoader(http, './i18n/', '.json');

  export const appConfig: ApplicationConfig = {
    providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })
    ],
  };
  ```
</code-block>

En nuestro componente principal de la aplicación configuraremos el idioma que queramos:

<code-block>
  <span>app.component.ts</span>

  ```typescript
  import { Component, inject } from '@angular/core';
  import { TranslateService } from '@ngx-translate/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
  })
  export class AppComponent {

    private readonly _translate = inject(TranslateService);

    constructor() {
      this._translate.setDefaultLang('es');
      this._translate.use('es');
    }
  }
  ```
</code-block>

## Uso

Deberemos crear tantos json como idomas desemos tener en nuetra aplicación:

<code-block>
  <span>public/i18n/en.json</span>

  ```typescript
  {
    "app": {
      "hello": "hello {{value}}",
      "title": "Translation Demo"
    }
  }
  ```
</code-block>

Tendremos que importar la directiva o el pipe, según que queramos usar a nuestro componente:

<code-block>
  <details>
  <summary>your-component.ts</summary>

  ```typescript
  import {Component} from '@angular/core';
  import {TranslatePipe, TranslateDirective} from "@ngx-translate/core";

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [TranslatePipe, TranslateDirective],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  })
  export class YourComponent {
    ...
    private _name = signal<string>("Guille");
    public name = this._name.asReadonly();
  }
  ```
  </details>

  <details>
  <summary>app.template.html</summary>

  ```typescript
  {{ 'app.hello' | translate }}

  {{ 'app.hello' | translate:{value: name()} }}

  app.hello
  ```
  </details>

  <details>
  <summary>render</summary>

  ```typescript
  hello {{value}}
  hello Guille
  hello Guille
  hello Guille
  ```
  </details>
</code-block>

También podremos usarlo en el código:

<code-block>
  <span>app.component.ts</span>

  ```typescript
  import {Component} from '@angular/core';
  import {TranslateService, _} from "@ngx-translate/core";

  @Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  })
  export class YourComponent {
    private _name = signal("Guille");
    public name = this._name.asReadonly();

    constructor(private translate: TranslateService) {
      this.translate.get(_('app.hello'), {value: this.name()}).subscribe((res: string) => {
        console.log(res); //=> 'hello Guille'
      });
    }
  }
  ```
</code-block>

