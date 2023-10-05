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


    Find(id: number)
    {
        let product: Product;

        product = new Product;
        product.id = 0;

          return this.http.get<Product>(this.getHttpRequestLink("findbyid/" + id)).pipe(
            map((response) => {
                
                product = response;
    
                return product;
            }),
            catchError((error) => {
                throw error;
            }));
    }

    FindNew(id: number)
    {
        let product: Product;

        product = new Product;
        product.id = 0;

          return this.http.get<Product>(this.getHttpRequestLink("findbyidnew/" + id)).pipe(
            map((response) => {
                
                product = response;
    
                return product;
            }),
            catchError((error) => {
                throw error;
            }));
    }

    GetImg(id: number)
    {
          return this.http.get<Product>(this.getHttpRequestLink("getproductimg/" + id)).pipe(
            map((response) => {   
                
                return response.imgData;
            }),
            catchError((error) => {
                throw error;
            }));
    }


    Create(formData: FormData) {

        return this.http.post(this.getHttpRequestLink("new2"), formData, {responseType: 'text'}).pipe(
            map(() => {
                console.log("producto creado");
            }),
            catchError((error) => {
                console.log(error.message);

                throw error;
            }));
    }

    Edit(formData: FormData) {

        return this.http.put(this.getHttpRequestLink("editnew"), formData, {responseType: 'text'}).pipe(
            map(() => {
                console.log("producto creado");
            }),
            catchError((error) => {
                throw error;
            }));
    }

    Delete(id: number)
    {
        let product: Product;

        product = new Product;
        product.id = 0;

        return this.http.delete(this.getHttpRequestLink("delete/" + id), {responseType: 'text'}).pipe(
            map(() => {
                
            }),
            catchError((error) => {
                throw error;
            }));
    }
}
