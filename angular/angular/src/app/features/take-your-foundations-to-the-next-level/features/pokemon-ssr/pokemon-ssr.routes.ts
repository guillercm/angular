import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout/layout.component'),
    children: [
      {
        path: 'about',
        loadComponent: () => import('./pages/about-page/about-page.component'),
      },
      {
        path: 'pricing',
        loadComponent: () => import('./pages/pricing-page/pricing-page.component'),
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact-page/contact-page.component'),
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
