import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from './../../../../models/product.class';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
//Service
import { ProductManagerService } from './../../../services/product-manager.service';


@Component({
  selector: 'app-care-products',
  templateUrl: './care-products.component.html',
  styleUrls: ['./care-products.component.scss']
})
export class CareProductsComponent implements OnInit, OnDestroy {
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
  public products : Product;
  public product : Product;
  public Subscription: Subscription;
  public API1 :string = "https://5de8ab9e9578cb001487b304.mockapi.io/hightlightProduct";
  public API2 : string = "https://5de8ab9e9578cb001487b304.mockapi.io/hightlightProduct2";
  public API;
  @Output() sendProduct : EventEmitter<any> = new EventEmitter<Object>();
  constructor(
    public ProductManagerService :ProductManagerService,
    public ActivatedRoute: ActivatedRoute,
    public Router :Router
  ) { }

  ngOnInit() {
    this.loadProduct(this.API1);
  }
  navigate(value){
    //let id;
   // this.Subscription = this.ActivatedRoute.params.subscribe(data=>{
    //  id = data['id'];
  //  })
   // console.log(id);
   // this.Router.navigate(['product', `${id}`]);
   console.log(value)
   this.Router.navigate(['/product', `${value}`]);
   this.Subscription = this.ProductManagerService.getProduct(`${this.API1}/${value}`).subscribe(data=>{
    if(data){
      this.product = data;
     // console.log(this.product);
      this.sendProduct.emit(this.product);
    }else{
      this.Subscription = this.ProductManagerService.getProduct(`${this.API2}/${value}`).subscribe(data=>{
        this.product = data;
        //console.log(this.product);
        this.sendProduct.emit(this.product);
      },error=>{
        console.log(error)
      });
    }
    
  },error=>{
    console.log(error)
  });
  }
  loadProduct(API){
    this.Subscription = this.ProductManagerService.getProduct(API).subscribe(data=>{
      this.products = data;
    },error=>{
      console.log(error)
    });
  }
  
  ngOnDestroy(){
    if(this.Subscription){
      this.Subscription.unsubscribe();
    }
  }
  addtocart(product){
    product.amount = 1;
    this.ProductManagerService.addtocart(product,1);
    this.ProductManagerService.getcart();
  }

}
