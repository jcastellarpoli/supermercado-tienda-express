import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { globalRoutes } from './modules/global/global-routing.module';
import { productRoutes } from './modules/product/product-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([...globalRoutes, ...productRoutes])
  ],
  exports: [RouterModule]
})
export class RouteModule { }
