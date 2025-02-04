import { Routes } from '@angular/router';
import { BasicTypesComponent } from './typescript-intro/pages/basic-types/basic-types.component';
import { DestructuringComponent } from './typescript-intro/pages/destructuring/destructuring.component';
import { FunctionDestructuringComponent } from './typescript-intro/pages/function-destructuring/function-destructuring.component';
import { FunctionsComponent } from './typescript-intro/pages/functions/functions.component';
import { TypesComponent } from './typescript-intro/pages/types/types.component';
import ObjectInterfaceComponent from './typescript-intro/pages/object-interface/object-interface.component';
import { ClassesComponent } from './typescript-intro/pages/classes/classes.component';
import { GenericsComponent } from './typescript-intro/pages/generics/generics.component';
import { DecoratorsComponent } from './typescript-intro/pages/decorators/decorators.component';
import { InstallationComponent } from './translate/pages/installation/installation.component';

export const featuresRoutes: Routes = [
  {
    title: 'Introducción de typescript',
    path: 'typescript-intro',
    loadComponent: () => import('./typescript-intro/pages/typescript-intro/typescript-intro.component'),
    children: [
      {
        path: 'basic-types',
        title: 'Tipos básicos',
        component: BasicTypesComponent
      },
      {
        path: 'object-interface',
        title: 'Interfaces',
        component: ObjectInterfaceComponent
      },
      {
        path: 'functions',
        title: 'Funciones',
        component: FunctionsComponent
      },
      {
        path: 'types',
        title: 'Tipos',
        component: TypesComponent
      },
      {
        path: 'destructuring',
        title: 'Desestructuración',
        component: DestructuringComponent
      },
      {
        path: 'function-destructuring',
        title: 'Desestructuración de funciones',
        component: FunctionDestructuringComponent
      },
      {
        path: 'classes',
        title: 'Clases',
        component: ClassesComponent
      },
      {
        path: 'generics',
        title: 'Tipos genéricos',
        component: GenericsComponent
      },
      {
        path: 'decorators',
        title: 'Decoradores',
        component: DecoratorsComponent
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
        component: InstallationComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'typescript-intro'
  }
];
