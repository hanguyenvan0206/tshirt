import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductManagerModule } from './product-manager/product-manager.module';
import { AcountManagerModule } from './acount-manager/acount-manager.module';
import { RouterModule  } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
//app component
import { AppComponent } from './app.component';
//home page
import { HomepageComponent } from './components/homepage/homepage.component';
import { HightlightProductComponent } from './components/homepage/hightlight-product/hightlight-product.component';
import { DailyDealComponent } from './components/homepage/daily-deal/daily-deal.component';
import { HotProductComponent } from './components/homepage/hot-product/hot-product.component';
import { CommentComponent } from './components/homepage/comment/comment.component';
import { ProductAllComponent } from './components/homepage/product-all/product-all.component';
//pages
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { InformationPageComponent } from './components/information-page/information-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ControlPageComponent } from './components/control-page/control-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HightlightProductComponent,
    DailyDealComponent,
    HotProductComponent,
    CommentComponent,
    ProductAllComponent,
    HomepageComponent,
    AboutPageComponent,
    ContactPageComponent,
    NotFoundPageComponent,
    InformationPageComponent,
    CartPageComponent,
    ControlPageComponent,
 
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    ProductManagerModule,
    AcountManagerModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
