import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
//service
import { ProductManagerService } from './services/product-manager.service';
//components
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
//router
import { routers } from './product.routes';
import { RatingComponent } from './components/product-detail-page/rating/rating.component';
import { CareProductsComponent } from './components/product-detail-page/care-products/care-products.component';


@NgModule({
  declarations: [ProductPageComponent, ProductDetailPageComponent, RatingComponent, CareProductsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    SharedModule,
    RouterModule.forChild(routers)
  ],
  providers: [
    ProductManagerService
  ],
})
export class ProductManagerModule { }
