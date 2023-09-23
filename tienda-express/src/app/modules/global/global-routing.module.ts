import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'index', component: IndexComponent },
      { path: 'menu', component: MenuComponent },
      { path: '**', component: IndexComponent }
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class GlobalRoutingModule { }
