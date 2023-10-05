import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Product } from 'src/app/services/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit{

  @Input() product!: Product;

  imagePreviewUrl!: string | ArrayBuffer | null | SafeUrl;

  constructor(private http: HttpClient, private productService: ProductService, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadImage();
  }

  loadImage()
  {
    this.productService.GetImg(this.product.id).subscribe((imgData) => {

    const imageUrl = `data:image/jpeg;base64,${imgData}`;

      this.http.get(imageUrl, { responseType: 'blob' }).subscribe((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Create a SafeUrl from the result using DomSanitizer
          this.imagePreviewUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
        };
  
        reader.readAsDataURL(blob);
      });

    });
  }

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
