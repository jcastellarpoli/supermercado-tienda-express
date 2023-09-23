import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './modules/global/components/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    // loadChildren: () => import('./modules/global/global.module').then(m => m.GlobalModule)
    loadChildren: () => import('./route.module').then(m => m.RouteModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
