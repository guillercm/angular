## Configuración

Deberemos de hacer las siguientes configuraciones en el fichero de configuración de la aplicación:

<code-block>
  <span>app.config.ts</span>

  ```typescript
  import { provideHttpClient } from "@angular/common/http";
  import { provideMarkdown } from 'ngx-markdown';

  export const appConfig: ApplicationConfig = {
    providers: [
      ...
      provideHttpClient(),
      provideMarkdown()
      ...
    ]
  };

  ```
</code-block>

En nuestro ```angular.json``` deberemos de incluir los estilos y los scripts, en este caso, yo necesitaré los scripts para typescript y bash

<code-block>
  <span>angular.json</span>

  ```typescript
  {
    ...
    "projects": {
      "angular": {
        ...
        "architect": {
          "build": {
            ...
            "options": {
              ...
              "styles": [
                "node_modules/animate.css/animate.min.css",
                "node_modules/bootstrap/dist/css/bootstrap.min.css",
                "node_modules/bootstrap-icons/font/bootstrap-icons.css",
                "node_modules/prismjs/themes/prism-okaidia.css",
                "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css",
                "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css",
                "src/styles.scss"
              ],
              "scripts": [
                "node_modules/prismjs/prism.js",
                "node_modules/prismjs/components/prism-bash.min.js",
                "node_modules/prismjs/components/prism-typescript.min.js",
                "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js",
                "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js"
              ]
            },
            ...
          },
          ...
        }
      }
    }
  }


  ```
</code-block>

## Ejemplos de usos


### Usando un string


<code-block>
  <details>
  <summary>your-component.ts</summary>

  ```typescript
  import { Component } from '@angular/core';
  import { MarkdownModule } from 'ngx-markdown';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [MarkdownModule]
  })
  export class AppComponent {
    data = `
    # Hola mundo
    ## Mi primer markdown desde angular :)
    `
  }
  ```
  </details>

  <details>
  <summary>app.template.html</summary>

  ```html
  <markdown [data]="data"></markdown>
  ```
  </details>

  <details>
  <summary>render</summary>

  ```typescript
  # Hola mundo
  ## Mi primer markdown desde angular :)
  ```
  </details>
</code-block>


### Usando el contenido de un fichero


<code-block>
  <details>
  <summary>public/static/docs/helloWord.md</summary>

  ```typescript
  # Hola mundo
  ## Mi primer markdown desde angular :)
  ```
  </details>
  <details>
  <summary>your-component.ts</summary>

  ```typescript
  import { Component } from '@angular/core';
  import { MarkdownModule } from 'ngx-markdown';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [MarkdownModule]
  })
  export class AppComponent {
    src = "public/static/docs/helloWord.md"
  }
  ```
  </details>

  <details>
  <summary>app.template.html</summary>

  ```html
  <markdown [disableSanitizer]="true" [src]="src"></markdown>
  ```
  </details>

  <details>
  <summary>render</summary>

  ```typescript
  # Hola mundo
  ## Mi primer markdown desde angular :)
  ```
  </details>
</code-block>


