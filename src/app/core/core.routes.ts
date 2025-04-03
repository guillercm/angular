import { Routes } from '@angular/router';
import LayoutComponent from './components/pages/layout/layout.component';

export const coreRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../features/features.routes').then(m => m.featuresRoutes)
      }
    ]
  }
];
