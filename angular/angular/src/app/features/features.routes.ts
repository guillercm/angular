import { Routes } from '@angular/router';
import { DocsComponent } from '@core/components/docs/docs.component';
import { PdfComponent } from '@core/components/pdf/pdf.component';
import { FlexCssComponent } from './my-methodology/pages/flex-css/flex-css.component';

export const featuresRoutes: Routes = [
  {
    title: 'Angular de cero a experto',
    path: 'angular-from-zero-to-expert',
    loadComponent: () => import('./angular-from-zero-to-expert/layout/layout.component'),
    children: [
      {
        path: 'installations',
        title: 'Instalaciones',
        component: DocsComponent
      },
      {
        path: 'maps-vs-sets',
        title: 'Maps Vs Sets',
        component: DocsComponent
      },
      {
        path: 'typescript_bases',
        title: 'Bases de typescript',
        component: DocsComponent
      },
      {
        path: 'angular_bases',
        title: 'Bases de Angular',
        loadComponent: () => import('./angular-from-zero-to-expert/bases/pages/home-page/home-page.component'),
      },
      {
        path: 'gifs',
        title: 'Aplicación de gifs',
        loadComponent: () => import('./angular-from-zero-to-expert/gifs/pages/home-page/home-page.component'),
      },
      {
        path: 'countries',
        title: 'Aplicación de países',
        loadComponent: () => import('./angular-from-zero-to-expert/country/layouts/layout/layout.component'),
        children: [
          {
            path: '',
            loadChildren: () => import('./angular-from-zero-to-expert/country/countries.routes').then(m => m.countriesRoutes)
          }
        ]
      },
      {
        path: 'pipes',
        title: 'Pipes',
        loadComponent: () => import('./angular-from-zero-to-expert/pipes/pages/home-page/home-page.component')
      },
      {
        path: 'mapbox',
        title: 'Mapas',
        loadComponent: () => import('./angular-from-zero-to-expert/mapbox/pages/home-page/home-page.component')
      },
      {
        path: 'tesloshop',
        title: 'Tesloshop',
        loadChildren: () => import('./angular-from-zero-to-expert/tesloshop/frontend/tesloshop.routes').then(m => m.routes)
      },
      {
        path: 'angular-cheat-sheet',
        title: 'Trucos de angular',
        data: {pdf: 'angular-cheat-sheet'},
        component: PdfComponent
      },
      {
        path: 'angular-cheat-sheet-v2',
        title: 'Trucos de angular v2',
        data: {pdf: 'angular-cheat-sheet-v2'},
        component: PdfComponent
      },
      {
        path: 'angular-notes-for-professionals',
        title: 'Notas para profesionales',
        data: {pdf: 'Angular2NotesForProfessionals'},
        component: PdfComponent
      },
      {
        path: 'docker',
        title: 'Docker',
        data: {pdf: 'docker'},
        component: PdfComponent
      },
      {
        path: 'docker-cheat-sheet',
        title: 'Trucos de docker',
        data: {pdf: 'docker-cheat-sheet'},
        component: PdfComponent
      },
      {
        path: 'nest-cheatsheet',
        title: 'Trucos de nest',
        data: {pdf: 'nest-cheatsheet'},
        component: PdfComponent
      },
      {
        path: 'refactoring-ui',
        title: 'Refactoring UI',
        data: {pdf: 'refactoring-ui'},
        component: PdfComponent
      }
    ]
  },
  {
    title: 'Lleva tus bases al siguiente nivel',
    path: 'take-your-foundations-to-the-next-level',
    loadComponent: () => import('./take-your-foundations-to-the-next-level/layout/layout.component'),
    children: [
      {
        path: 'installations',
        title: 'Instalación',
        component: DocsComponent
      },
      {
        path: 'calculator',
        title: 'Calculadora',
        loadChildren: () => import('./take-your-foundations-to-the-next-level/features/calculator/calculator.routes').then(m => m.routes)
      },
      {
        path: 'testing',
        title: 'Testing',
        component: DocsComponent
      },
      {
        path: 'testings-examples',
        title: 'Ejemplos de testing',
        component: DocsComponent
      },
      {
        path: 'create-snippets',
        title: 'Crear snippets personalizados',
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
      },
      {
        path: 'flexbox',
        title: 'Flexbox',
        component: FlexCssComponent
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
    redirectTo: 'angular-from-zero-to-expert'
  }
];
