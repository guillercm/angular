import { Routes } from '@angular/router';
import { DocsComponent } from '@core/components/docs/docs.component';

export const featuresRoutes: Routes = [
  {
    title: 'Angular de cero a experto',
    path: 'angular-from-zero-to-expert',
    loadComponent: () => import('./angular-from-zero-to-expert/layout/layout.component'),
    children: [
      {
        path: 'typescript_bases',
        title: 'Bases de typescript',
        component: DocsComponent
      },
      {
        path: 'angular_bases',
        title: 'Bases de Angular',
        loadComponent: () => import('./angular-from-zero-to-expert/pages/bases/bases.component'),
      }
    ]
  },
  {
    title: 'Traducciones',
    path: 'translate',
    loadComponent: () => import('./translate/pages/translate/translate.component'),
    children: [
      {
        path: 'installation',
        title: 'Instalación',
        component: DocsComponent
      },
      {
        path: 'configuration-use',
        title: 'Configuración y uso',
        component: DocsComponent
      },
    ]
  },
  {
    path: 'simpsons',
    title: 'Simpsons',
    loadComponent: () => import('./simpsons/pages/simpsons/simpsons.component'),
  },
  {
    path: 'my-methodology',
    title: 'Mi metodología',
    loadComponent: () => import('./my-methodology/pages/my-methodology/my-methodology.component'),
    children: [
      {
        path: 'notes',
        title: 'Notas',
        component: DocsComponent
      }
    ]
  },
  {
    path: 'markdown',
    title: 'Markdown',
    loadComponent: () => import('./markdown/pages/markdown/markdown.component'),
    children: [
      {
        path: 'installation',
        title: 'Instalación',
        component: DocsComponent
      },
      {
        path: 'configuration-use',
        title: 'Configuración y uso',
        component: DocsComponent
      },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'simpsons'
  }
];
