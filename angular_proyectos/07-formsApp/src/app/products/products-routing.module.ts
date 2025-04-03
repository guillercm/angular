import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { LifeCycleHooksComponent } from './components/life-cycle-hooks/life-cycle-hooks.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'product', component: ProductComponent },
      { path: 'lifeCycleHooks', component: LifeCycleHooksComponent },
      { path: '**', redirectTo: 'product' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
