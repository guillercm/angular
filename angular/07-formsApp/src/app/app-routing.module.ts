import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.module').then( m => m.ReactiveModule ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: 'selector',
    loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule ),
  },
  {
    path: 'lifeCycle',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsModule ),
  },
  {
    path: '**',
    redirectTo: 'reactive',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
