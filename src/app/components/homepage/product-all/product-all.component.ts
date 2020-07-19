import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from './../../../models/product.class';
import { Subscription } from 'rxjs';
//Service
import { ProductManagerService } from './../../../product-manager/services/product-manager.service';


@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.scss']
})
export class ProductAllComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    margin:10,
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
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  public isSofa: boolean = true;
  public isDecorator: boolean = false;
  public isRestroom: boolean = false;
  public products : Product;
  public Subscription: Subscription;
  public API1 :string = "https://5de8ab9e9578cb001487b304.mockapi.io/hightlightProduct";
  public API2 : string = "https://5de8ab9e9578cb001487b304.mockapi.io/hightlightProduct2";
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
  getSofa(){
    this.loadProduct(this.API1);
    this.isSofa = true;
    this.isDecorator = false;
    this.isRestroom = false;
  }
  getDecorator(){
    this.loadProduct(this.API2);
    this.isSofa = false;
    this.isDecorator = true;
    this.isRestroom = false;
  }
  getRestroom(){
    this.loadProduct(this.API1);
    this.isSofa = false;
    this.isDecorator = false;
    this.isRestroom = true;
  }
  ngOnDestroy(){
    if(this.Subscription){
      this.Subscription.unsubscribe();
    }
  }
  addtocart(product){
    this.ProductManagerService.buyProduct(product,1);
  }
}
