import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/services/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent implements OnInit, OnDestroy{

  id!: number;
  product!: Product;
  productexists: boolean = false;
  private sub: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {  

    this.LeerParametro();

    
  }

  LeerParametro()
  {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

    this.ObtenerProducto();
   });

   this.sub.unsubscribe();
  }

  ObtenerProducto()
  {
    this.productService.Find(this.id).subscribe((productFound) => {
      this.product = productFound;
      this.productexists = this.product.id > 0;
    });

    // this.product = this.productService.Find(this.id);
  }

  ngOnDestroy(): void {

    this.sub.unsubscribe();
  }

}
