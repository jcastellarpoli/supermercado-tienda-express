import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';

export const globalRoutes: Routes = [
  {
    path: '',
    component: IndexComponent
    // loadChildren: () => import('./global.module').then(m => m.GlobalModule)
    // children: [
    //   { path: 'index', component: IndexComponent },
    //   { path: 'menu', component: MenuComponent },
    //   { path: '**', component: IndexComponent }
    // ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(globalRoutes)
  ]
})
export class GlobalRoutingModule { }
