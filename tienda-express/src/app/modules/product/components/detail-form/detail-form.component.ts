import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  imagePreviewUrl!: string | ArrayBuffer | null | SafeUrl;

  constructor(private http: HttpClient, private route: ActivatedRoute, private productService: ProductService, private sanitizer: DomSanitizer) {}

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
    // this.productService.Find(this.id).subscribe((productFound) => {
    //   this.product = productFound;
    //   this.productexists = this.product.id > 0;
    // });

    this.productService.FindNew(this.id).subscribe((productFound) => {

      this.product = productFound;   
      this.productexists = this.product.id > 0;

      console.log(this.product);

      const imageUrl = `data:image/jpeg;base64,${this.product.imgData}`;

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

  ngOnDestroy(): void {

    this.sub.unsubscribe();
  }

}
