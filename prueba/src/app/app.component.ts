import { Component } from '@angular/core';

import * as fs from "fs";

fs.readFileSync("./data/products.json", "utf-8");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba';
}
