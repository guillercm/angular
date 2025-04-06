import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout/layout.component'),
    children: [
      {
        path: 'issues',
        loadComponent: () =>
          import('./modules/issues/pages/issues-list/issues-list-page.component'),
      },
      {
        path: 'issue/:number',
        loadComponent: () =>
          import('./modules/issues/pages/issue/issue-page.component'),
      },
      {
        path: '**',
        redirectTo: 'issues',
      },
    ]
  }
];
