import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/services/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  
  id!: number;
  product!: Product;
  newproduct!: boolean;
  private sub: any;
  imgSubmitted: string = "";

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {  

    this.LeerParametro();

  }

  LeerParametro()
  {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.newproduct = this.id == 0;

      if(this.newproduct)
      {
        this.product = new Product();
        this.product.id = 0;
      }
      else{
        this.ObtenerProducto();
      }
   });

   this.sub.unsubscribe();
  }

  ObtenerProducto()
  {
    this.productService.Find(this.id).subscribe((productFound) => {
      this.product = productFound;      
    });
  }

  ngOnDestroy(): void {

    this.sub.unsubscribe();
  }

  OnSubmit()
  {
    if(this.newproduct)
    {
      console.log("creado");
      //crear producto y redireccionar a la grilla
    }
    else
    {
      console.log("modificado");
      //editar producto y redireccionar a la grilla
    }
  }
}
