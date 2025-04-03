import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.routes').then(m => m.coreRoutes)
  },
  {
    path: 'internal-server-error',
    data: {
      'httpStatus': '500'
    },
    loadComponent: () => import('./core/components/pages/error/error-page.component')
  },
  {
    path: '**',
    data: {
      'httpStatus': '404'
    },
    loadComponent: () => import('./core/components/pages/error/error-page.component')
  },
];
