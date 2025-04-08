import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'forms',
    children: [
      {
        path: '',
        loadComponent: () => import('./forms/pages/home/home-page.component'),
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'forms'
  }
];
