import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout/layout.component'),
    children: [
      {
        path: 'pokemons/:id',
        loadComponent: () => import('./pages/pokemon/pokemon-page.component'),
      },
      {
        path: 'pokemons',
        loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about-page.component'),
      },
      {
        path: 'pricing',
        loadComponent: () => import('./pages/pricing/pricing-page.component'),
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact-page.component'),
      }
    ]
  },
  {
    path: '**',
    redirectTo: () => {
      // se pueden inyectar servicios y aplicar lógica
      return '';
    }
  }
];
