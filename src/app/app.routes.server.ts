import { RenderMode, ServerRoute, ServerRoutePrerenderWithParams } from '@angular/ssr';

// ServerRoutePrerenderWithParams
export const serverRoutes: (ServerRoute | ServerRoutePrerenderWithParams)[] = [
  {
    path: 'take-your-foundations-to-the-next-level/pokemon-ssr/pokemons/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [{ id: '1' }, { id: '2' }, { id: '3' }]; // Generates paths like: [{ id: '1' }, { id: '2' }, { id: '3' }]
    }
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
