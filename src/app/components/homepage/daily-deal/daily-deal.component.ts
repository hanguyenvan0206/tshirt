import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from './../../../models/product.class';
import { Subscription } from 'rxjs';
//Service
import { ProductManagerService } from './../../../product-manager/services/product-manager.service';
//pipe


@Component({
  selector: 'app-daily-deal',
  templateUrl: './daily-deal.component.html',
  styleUrls: ['./daily-deal.component.scss']
})
export class DailyDealComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  public products : Product;
  public Subscription: Subscription;
  public API1 :string = "https://5de8ab9e9578cb001487b304.mockapi.io/hightlightProduct";
  constructor(
    public ProductManagerService :ProductManagerService
  ) { }

  ngOnInit() {
    this.loadProduct(this.API1);
  }
  loadProduct(API){
    this.Subscription = this.ProductManagerService.getProduct(API).subscribe(data=>{
      this.products = data;
    },error=>{
      console.log(error)
    });
  }
  addtocart(product){
    this.ProductManagerService.buyProduct(product,1);
  }

}
