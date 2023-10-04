import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/services/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit{

  products: Product[] = [];

  constructor(private router: Router, private productService: ProductService)
  {}

  ngOnInit(): void {
    this.ObtenerProductos();
  }

  ObtenerProductos()
  {
    this.productService.All().subscribe((productList) => {
      this.products = productList;
    });
  }

  crearProducto()
  {
    this.router.navigate(['products/admin/form/', 0]);
  }

  editarProducto(id: number)
  {
    this.router.navigate(['products/admin/form/', id]);
  }

  eliminarProducto(id: number)
  {
    this.productService.Delete(id).subscribe(() => {
      this.ObtenerProductos();
    })

    

    // const indexOfObject = this.products.findIndex(object => {
    //   return object.id === id;
    // });
    
    // this.products.splice(indexOfObject, 1);
  }
}
