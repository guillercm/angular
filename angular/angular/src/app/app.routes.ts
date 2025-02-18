import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.routes').then(m => m.coreRoutes)
  },
  {
    path: '**',
    data: {
      'http-status-code': '404'
    },
    loadComponent: () => import('./core/components/pages/error/error-page.component')
  }
];
