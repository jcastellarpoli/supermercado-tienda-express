import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormComponent } from './components/form/form.component';



@NgModule({
  declarations: [
    IndexComponent,
    ProductCardComponent,
    FormComponent
  ],
  imports: [
    CommonModule    
  ],
  exports: [
    ProductCardComponent,
    CommonModule
  ]
})
export class ProductModule { }
