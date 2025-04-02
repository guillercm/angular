import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'take-your-foundations-to-the-next-level/pokemon-ssr/pokemons/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'angular-from-zero-to-expert/countries/by/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'angular-from-zero-to-expert/tesloshop/admin/products/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'angular-from-zero-to-expert/tesloshop/product/:idSlug',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
