import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/services/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService)
  {}

  ngOnInit(): void {
    this.ObtenerProductos();
  }

  ObtenerProductos()
  {
    this.products = this.productService.GetFive();
  }
}
