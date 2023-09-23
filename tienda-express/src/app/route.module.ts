import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { globalRoutes } from './modules/global/global-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(globalRoutes)
  ],
  exports: [RouterModule]
})
export class RouteModule { }
