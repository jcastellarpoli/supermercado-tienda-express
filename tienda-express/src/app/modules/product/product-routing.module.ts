import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';

export const productRoutes: Routes = [
  {
    path: 'products/index',
    component: IndexComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(productRoutes)]
})
export class ProductRoutingModule { }
