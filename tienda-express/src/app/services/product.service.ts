import { Injectable } from "@angular/core";
import { Product } from "./interfaces/product";
import { ProductCardComponent } from "../modules/product/components/product-card/product-card.component";

// import * as fs from "fs";
const productArray = require('src/app/data/products.json'); 
@Injectable({
    providedIn: 'root'
})
export class ProductService
{
    private products: Product[] = [];

    constructor()
    {
        // const contenidoArchivo = fs.readFileSync('src/app/data/products.json', 'utf-8');

        this.products = <Product[]>JSON.parse(JSON.stringify(productArray));
    }

    GetFive()
    {
        return this.products.slice(0, 4);
    }

    All()
    {
        return this.products;
    }

    Find(id: number)
    {
        let product: Product;

        product = new Product();

        this.products.forEach(item => {
            
            if(item.id == id)
            {
                product = item;
            }
        });

        return product;
    }
}
