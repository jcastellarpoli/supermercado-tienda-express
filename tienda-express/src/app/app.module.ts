import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalRoutingModule } from './modules/global/global-routing.module';
import { RouteModule } from './route.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlobalModule } from './modules/global/global.module';
import { ProductRoutingModule } from './modules/product/product-routing.module';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GlobalRoutingModule,
    ProductRoutingModule,
    RouteModule,
    BrowserAnimationsModule,
    GlobalModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
