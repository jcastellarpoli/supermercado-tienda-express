import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { MenuComponent } from './components/menu/menu.component';
import { GlobalRoutingModule } from './global-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from '../product/components/product-card/product-card.component';
import { ProductModule } from '../product/product.module';

@NgModule({
  declarations: [
    IndexComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    GlobalRoutingModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ProductModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class GlobalModule { }
