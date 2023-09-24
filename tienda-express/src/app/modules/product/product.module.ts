import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormComponent } from './components/form/form.component';
import { DetailFormComponent } from './components/detail-form/detail-form.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    IndexComponent,
    ProductCardComponent,
    FormComponent,
    DetailFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    ProductCardComponent,
    CommonModule
  ]
})
export class ProductModule { }
