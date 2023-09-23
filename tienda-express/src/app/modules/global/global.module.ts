import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { MenuComponent } from './components/menu/menu.component';
import { GlobalRoutingModule } from './global-routing.module';



@NgModule({
  declarations: [
    IndexComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    GlobalRoutingModule
  ]
})
export class GlobalModule { }
