import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from './../../../models/product.class';
import { Subscription } from 'rxjs'; 
import { Router } from '@angular/router'
//Service
import { ProductManagerService } from './../../../product-manager/services/product-manager.service';

@Component({
  selector: 'app-hightlight-product',
  templateUrl: './hightlight-product.component.html',
  styleUrls: ['./hightlight-product.component.scss']
})
export class HightlightProductComponent implements OnInit, OnDestroy {
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
  public API3: string = 'https://5de8ab9e9578cb001487b304.mockapi.io/cart';
  public API4 = 'https://5de8db5d9578cb001487b566.mockapi.io/currentuser';
  public API;
  public currentUser;
  constructor(
    public ProductManagerService :ProductManagerService,
    public Router: Router
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
    this.ProductManagerService.setAPI(this.API1);
  }
  getDecorator(){
    this.loadProduct(this.API2);
    this.isSofa = false;
    this.isDecorator = true;
    this.isRestroom = false;
    this.ProductManagerService.setAPI(this.API2);
  }
  getRestroom(){
    this.loadProduct(this.API1);
    this.isSofa = false;
    this.isDecorator = false;
    this.isRestroom = true;
    this.ProductManagerService.setAPI(this.API1);
  }
  ngOnDestroy(){
    if(this.Subscription){
      this.Subscription.unsubscribe();
    }
  }
  navigate(value){
    console.log(value)
  }
  addtocart(product){
    this.ProductManagerService.buyProduct(product,1);
  }
 

}
