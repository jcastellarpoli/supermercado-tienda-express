import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/services/interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: Product;

  constructor(private router: Router) {}

  clickMethod()
  {
    // window.location.href = "/products/detail/" + this.product.id;

  //   this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
  //     this.router.navigate(['products/detail', this.product.id]);
  // });

    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['products/detail', this.product.id]);
  }
}
