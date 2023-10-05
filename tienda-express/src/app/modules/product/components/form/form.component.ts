import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  formData: any;
  imagePreviewUrl!: string | ArrayBuffer | null | SafeUrl;
  selectedFile!: File;

  constructor(private http: HttpClient, private route: ActivatedRoute, private productService: ProductService, private router: Router, private sanitizer: DomSanitizer) {}

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
        this.product.issale = false;
      }
      else{
        this.ObtenerProducto();
      }
   });

   this.sub.unsubscribe();
  }

  ObtenerProducto()
  {
    this.product = new Product();

    this.productService.FindNew(this.id).subscribe((productFound) => {

      this.product = productFound;   

      console.log(this.product);

      const imageUrl = `data:image/jpeg;base64,${this.product.imgData}`;

      this.http.get(imageUrl, { responseType: 'blob' }).subscribe((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          
          this.imagePreviewUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
        };
  
        reader.readAsDataURL(blob);
      });
      
    });
  }

  ngOnDestroy(): void {

    this.sub.unsubscribe();
  }

  OnSubmit(formData: FormData)
  {
    this.formData = new FormData();

    this.formData.append('name', this.product.name);
    this.formData.append('description', this.product.description);
    this.formData.append('unit_price', this.product.unit_price.toString());
    this.formData.append('issale', this.product.issale);
    this.formData.append('count', this.product.count);
    this.formData.append('image', this.selectedFile);

    if(this.newproduct)
    {
      this.productService.Create(this.formData).subscribe(() => {  
        //producto creado correctamente

        this.router.navigate(['products/admin']);
      });

      //crear producto y redireccionar a la grilla
    }
    else
    {
      this.formData.append('id', this.product.id);

      this.productService.Edit(this.formData).subscribe(() => {
        
        this.router.navigate(['products/admin']);

        //producto editado correctamente
      });

      //editar producto y redireccionar a la grilla
    }
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
  reader.onload = () => {
    this.imagePreviewUrl = reader.result;
  };
  reader.readAsDataURL(this.selectedFile);
  }
}
