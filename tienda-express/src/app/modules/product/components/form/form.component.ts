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
  formData: any;
  imagePreviewUrl!: string | ArrayBuffer | null;
  selectedFile!: File;

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
    this.productService.FindNew(this.id).subscribe((productFound) => {
      this.product = productFound;   

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(this.product.imgData);
      
    });
  }

  ngOnDestroy(): void {

    this.sub.unsubscribe();
  }

  OnSubmit(formData: FormData)
  {
    this.formData.append('name', this.product.name);
    this.formData.append('description', this.product.description);
    this.formData.append('unit_price', this.product.unit_price.toString());
    this.formData.append('issale', this.product.issale.toString());
    this.formData.append('image', this.selectedFile);

    if(this.newproduct)
    {
      this.productService.Create(this.formData).subscribe(() => {  
        //producto creado correctamente
      });

      //crear producto y redireccionar a la grilla
    }
    else
    {
      console.log("modificado");
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
