import { Routes } from '@angular/router';

export const featuresRoutes: Routes = [
  {
    path: 'initiation',
    title: 'Inicio',
    loadComponent: () => import('./my-methodology/pages/my-methodology/my-methodology.component'),
    children: [
      {
        path: 'introduction',
        title: 'Introducción',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'notes',
        title: 'Notas',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: '**',
        redirectTo: 'introduction'
      }
    ]
  },
  {
    title: 'Angular de cero a experto',
    path: 'angular-from-zero-to-expert',
    loadComponent: () => import('./angular-from-zero-to-expert/layout/layout.component'),
    children: [
      {
        path: 'installations',
        title: 'Instalaciones',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'maps-vs-sets',
        title: 'Maps Vs Sets',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'typescript_bases',
        title: 'Bases de typescript',
        loadComponent: () => import('../core/components/docs/docs.component'),
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
        loadComponent: () => import('../core/components/pdf/pdf.component'),
      },
      {
        path: 'angular-cheat-sheet-v2',
        title: 'Trucos de angular v2',
        data: {pdf: 'angular-cheat-sheet-v2'},
        loadComponent: () => import('../core/components/pdf/pdf.component'),
      },
      {
        path: 'angular-notes-for-professionals',
        title: 'Notas para profesionales',
        data: {pdf: 'Angular2NotesForProfessionals'},
        loadComponent: () => import('../core/components/pdf/pdf.component'),
      },
      {
        path: 'docker',
        title: 'Docker',
        data: {pdf: 'docker'},
        loadComponent: () => import('../core/components/pdf/pdf.component'),
      },
      {
        path: 'docker-cheat-sheet',
        title: 'Trucos de docker',
        data: {pdf: 'docker-cheat-sheet'},
        loadComponent: () => import('../core/components/pdf/pdf.component'),
      },
      {
        path: 'nest-cheatsheet',
        title: 'Trucos de nest',
        data: {pdf: 'nest-cheatsheet'},
        loadComponent: () => import('../core/components/pdf/pdf.component'),
      },
      {
        path: 'angular-certificate',
        title: 'Certificado',
        data: {pdf: 'angular-certificate'},
        loadComponent: () => import('../core/components/pdf/pdf.component'),
      },
      {
        path: 'refactoring-ui',
        title: 'Refactoring UI',
        data: {pdf: 'refactoring-ui'},
        loadComponent: () => import('../core/components/pdf/pdf.component'),
      },
      {
        path: '**',
        redirectTo: 'mapbox'
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
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'calculator',
        title: 'Calculadora',
        loadChildren: () => import('./take-your-foundations-to-the-next-level/features/calculator/calculator.routes').then(m => m.routes)
      },
      {
        path: 'testing',
        title: 'Testing',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'testings-examples',
        title: 'Ejemplos de testing',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'create-snippets',
        title: 'Crear snippets personalizados',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'seo-ssr-ssg-hydration',
        title: 'SEO SSR SSG Hydration',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'pokemon-ssr',
        title: 'Pokemon ssr',
        loadChildren: () => import('./take-your-foundations-to-the-next-level/features/pokemon-ssr/pokemon-ssr.routes').then(m => m.routes)
      },
      {
        path: 'netlify',
        title: 'Netlify',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'github-issues',
        title: 'Github issues',
        loadChildren: () => import('./take-your-foundations-to-the-next-level/features/github-issues/github-issues.routes').then(m => m.routes)
      },
      {
        path: 'tanstack-query',
        title: 'Tanstack Query',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'github-api',
        title: 'Github Api',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'npm',
        title: 'npm',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      // {
      //   path: 'cookies',
      //   title: 'Cookies',
      //   loadComponent: () => import('../core/components/docs/docs.component'),
      // }
      {
        path: 'angular-pro-certificate',
        title: 'Certificado',
        data: {pdf: 'angular-pro-certificate'},
        loadComponent: () => import('../core/components/pdf/pdf.component'),
      },
      {
        path: '**',
        redirectTo: 'npm'
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
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'configuration-use',
        title: 'Configuración y uso',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
    ]
  },
  // {
  //   path: 'simpsons',
  //   title: 'Simpsons',
  //   loadComponent: () => import('./simpsons/pages/simpsons/simpsons.component'),
  // },
  {
    path: 'markdown',
    title: 'Markdown',
    loadComponent: () => import('./markdown/pages/markdown/markdown.component'),
    children: [
      {
        path: 'installation',
        title: 'Instalación',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'configuration-use',
        title: 'Configuración y uso',
        loadComponent: () => import('../core/components/docs/docs.component'),
      }
    ]
  },
  {
    path: 'testing',
    title: 'Testing',
    children: [
      {
        path: 'introduction',
        title: 'Introducción',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'login-tests',
        title: 'Login para pruebas',
        loadChildren: () => import('./testing/testing.routes').then(m => m.routes)
      },
      {
        path: 'jasmine',
        title: 'Jasmine',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'playwright',
        title: 'Playwright',
        loadComponent: () => import('../core/components/docs/docs.component'),
      },
      {
        path: 'cypress',
        title: 'Cypress',
        loadComponent: () => import('../core/components/docs/docs.component'),
      }
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'initiation'
  }
];
