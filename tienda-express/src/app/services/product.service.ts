import { Injectable } from "@angular/core";
import { Product } from "./interfaces/product";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from "rxjs";

const apiLink = "http://localhost:4201/products/";

//const productArray = require('src/app/data/products.json'); 
@Injectable({
    providedIn: 'root'
})
export class ProductService
{
    constructor(private http: HttpClient)
    {
        // const contenidoArchivo = fs.readFileSync('src/app/data/products.json', 'utf-8');

        //this.products = <Product[]>JSON.parse(JSON.stringify(productArray));
    }

    getHttpRequestLink(uri: string)
    {
        return apiLink + uri;
    }


    GetFive(): Observable<Product[]> {

        let products: Product[] = [];

        return this.http.get<Product[]>(this.getHttpRequestLink("")).pipe(
          map((response) => {
            products = response;
            console.log(products);
            return products.slice(0, 4);
          }),
          catchError((error) => {
            throw error;
          })
        );
      }

    // GetFive()
    // {
    //     let products: Product[] = [];

    //     this.http.get<Product[]>(this.getHttpRequestLink("")).subscribe({
    //         next: (response) => {

    //             products = response;
    //             console.log(products);
    //         },
    //         error: (error) => {
    //           throw error;
    //         }
    //       });

    //     //console.log(this.products);

    //     return products.slice(0, 4);
    // }

    All()
    {
        let products: Product[] = [];

        return this.http.get<Product[]>(this.getHttpRequestLink("")).pipe(
        map((response) => {
            
            products = response;

            return products;
        }),
        catchError((error) => {
            throw error;
        }));

    }

    // Find(id: number)
    // {
    //     let product: Product;

    //     product = new Product();

    //     this.products.forEach(item => {
            
    //         if(item.id == id)
    //         {
    //             product = item;
    //         }
    //     });

    //     return product;
    // }

    Find(id: number)
    {
        let product: Product;

        product = new Product;
        product.id = 0;

        // this.http.get<Product>(this.getHttpRequestLink("findbyid/" + id)).subscribe({
        //     next: (response) => {

        //         product = response;
        //     },
        //     error: (error) => {
        //         throw error;
        //     }
        //   });

          return this.http.get<Product>(this.getHttpRequestLink("findbyid/" + id)).pipe(
            map((response) => {
                
                product = response;
    
                return product;
            }),
            catchError((error) => {
                throw error;
            }));
    }
}
