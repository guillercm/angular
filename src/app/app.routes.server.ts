import { RenderMode, ServerRoute } from '@angular/ssr';
// ServerRoutePrerenderWithParams
export const serverRoutes: ServerRoute[] = [
  {
    path: 'take-your-foundations-to-the-next-level/pokemon-ssr/pokemons/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'angular-from-zero-to-expert/countries/by/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'angular-from-zero-to-expert/tesloshop/admin/products/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'angular-from-zero-to-expert/tesloshop/product/:idSlug',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
