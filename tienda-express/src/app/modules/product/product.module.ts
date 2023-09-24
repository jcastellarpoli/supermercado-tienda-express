import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormComponent } from './components/form/form.component';
import { DetailFormComponent } from './components/detail-form/detail-form.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    IndexComponent,
    ProductCardComponent,
    FormComponent,
    DetailFormComponent,
    AdminProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    ProductCardComponent,
    CommonModule
  ]
})
export class ProductModule { }
