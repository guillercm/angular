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
        loadComponent: () => import('./angular-from-zero-to-expert/country/pages/home-page/home-page.component'),
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
      },
      {
        path: 'docker',
        title: 'Docker',
        data: {pdf: 'docker'},
        component: PdfComponent
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
