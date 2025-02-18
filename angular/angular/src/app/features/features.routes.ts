import { Routes } from '@angular/router';
import { DocsComponent } from '@core/components/docs/docs.component';

export const featuresRoutes: Routes = [
  {
    title: 'Introducción de typescript',
    path: 'typescript-intro',
    loadComponent: () => import('./typescript-intro/pages/typescript-intro/typescript-intro.component'),
    children: [
      {
        path: 'basic-types',
        title: 'Tipos básicos',
        component: DocsComponent
      },
      {
        path: 'object-interface',
        title: 'Interfaces',
        component: DocsComponent
      },
      {
        path: 'functions',
        title: 'Funciones',
        component: DocsComponent
      },
      {
        path: 'types',
        title: 'Tipos',
        component: DocsComponent
      },
      {
        path: 'destructuring',
        title: 'Desestructuración',
        component: DocsComponent
      },
      {
        path: 'function-destructuring',
        title: 'Desestructuración de funciones',
        component: DocsComponent
      },
      {
        path: 'classes',
        title: 'Clases',
        component: DocsComponent
      },
      {
        path: 'generics',
        title: 'Tipos genéricos',
        component: DocsComponent
      },
      {
        path: 'decorators',
        title: 'Decoradores',
        component: DocsComponent
      },
      {
        path: 'optional-chaining',
        title: 'Encadenamiento Opcional',
        component: DocsComponent
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
