### TanStack Query

[TanStack Query](https://tanstack.com/query/v5/docs/framework/angular/overview)

[Instalación](https://tanstack.com/query/v5/docs/framework/angular/installation)
```bash
  npm i @tanstack/angular-query-experimental
```

[Añadir providers](https://tanstack.com/query/v5/docs/framework/angular/quick-start)

```typescript
  import { provideHttpClient } from '@angular/common/http'
  import {
    provideTanStackQuery,
    QueryClient,
  } from '@tanstack/angular-query-experimental'

  bootstrapApplication(AppComponent, {
    providers: [provideHttpClient(), provideTanStackQuery(new QueryClient()))],
  })
```

[devtools](https://tanstack.com/query/v5/docs/framework/angular/devtools)
```typescript
  import { provideHttpClient } from '@angular/common/http'
  import {
    provideTanStackQuery,
    QueryClient,
  } from '@tanstack/angular-query-experimental'

  bootstrapApplication(AppComponent, {
    providers: [provideHttpClient(), provideTanStackQuery(new QueryClient(), withDevtools()))],
  })
```
