import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { DetailFormComponent } from './components/detail-form/detail-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { FormComponent } from './components/form/form.component';

export const productRoutes: Routes = [
  {
    path: 'products/index',
    component: IndexComponent
  },
  {
    path: 'products/detail/:id',
    component: DetailFormComponent
  },
  {
    path: 'products/admin',
    component: AdminProductsComponent
  },
  {
    path: 'products/admin/form/:id',
    component: FormComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(productRoutes)]
})
export class ProductRoutingModule { }
