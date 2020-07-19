import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../../models/product.class';
import { Subscription } from 'rxjs';
//service
import { ProductManagerService } from './../../services/product-manager.service'

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {
  public product;
  public Subscription: Subscription;
  public API: string;
  public API1 :string = "https://5de8ab9e9578cb001487b304.mockapi.io/hightlightProduct";
  public API2 : string = "https://5de8ab9e9578cb001487b304.mockapi.io/hightlightProduct2";
  public API3: string = "https://5de8ab9e9578cb001487b304.mockapi.io/Comment";
  public number :number = 1;
  public isDes:  boolean = true;
  public data;
  public star: number;
  public comment;
  public cmt :string;
  public disable: boolean;

  constructor(
    public ActivatedRoute: ActivatedRoute,
    public ProductManagerService :ProductManagerService
  ) { }
  
  ngOnInit() {
    this.getProduct();
    this.loadProduct();
    this.getcomment();
    
  }
  recieveProduct(data){
    this.product=data;
    this.getcomment();
  }
  ongetRating(event:number){
    this.star = event;
  }
  putComment(){
    this.comment.unshift({
      user: "Ẩn danh",
      cmt: this.cmt,
      img: "https://danongonline.com.vn/wp-content/uploads/2018/02/anh-girl-xinh-9.jpg",
      star: this.star,
    });
    console.log(this.comment);
    console.log(this.data);
    let id;
    this.ActivatedRoute.params.subscribe(data=>{
      id = data['id'];
    })
        this.Subscription = this.ProductManagerService.updateComment(this.data,`${this.API3}/${id}`).subscribe(data=>{

          console.log(data);
        },error=>{
          console.log(error)
        });
    
    }
    
  
  getcomment(){
    let id;
    this.ActivatedRoute.params.subscribe(data=>{
      id = data['id'];
    })
    this.Subscription = this.ProductManagerService.getProduct(`${this.API3}/${id}`).subscribe(data=>{
      this.comment = data.comment;
      this.data = data;
     // console.log(this.comment);
    },error=>{
      console.log(error)
    });
  }
  loadProduct(){
    let id;
    this.ActivatedRoute.params.subscribe(data=>{
      id = data['id'];
    })
    this.Subscription = this.ProductManagerService.getProduct(`${this.API1}/${id}`).subscribe(data=>{
      if(data){
        this.product = data;
        if(this.product.status == true){
          this.disable = false;
          console.log(this.disable)
        }else{
          this.disable = true
          console.log(this.disable)
        }
      }else{
        this.Subscription = this.ProductManagerService.getProduct(`${this.API2}/${id}`).subscribe(data=>{
          this.product = data;
          if(this.product.status == true){
            this.disable = false;
            console.log(this.disable)
          }else{
            this.disable = true
            console.log(this.disable)
          }
        },error=>{
          console.log(error)
        });
      }
      
    },error=>{
      console.log(error)
    });
  
  }
  getProduct(){
    let id;
    this.API=this.ProductManagerService.api;
    //console.log(this.API)
    this.ActivatedRoute.params.subscribe(data=>{
      id = data['id'];
    })
    console.log(id)
    this.Subscription = this.ProductManagerService.getProduct(`${this.API}/${id}`).subscribe(data=>{
      this.product = data;
      if(this.product.status == true){
        this.disable = false;
        console.log(this.disable)
      }else{
        this.disable = true
        console.log(this.disable)
      }
     console.log(this.product);
    },error=>{
      console.log(error)
    });

  }
  byProduct(value :number){
    this.number = Number(this.number) + value;
    if(this.number<=0){
      this.number=1
    }
    return this.number;
  }
  isDesc(){
    this.isDes = true;
  }
  isComment(){
    this.isDes = false;
  }
  addtocart(product){
    this.ProductManagerService.buyProduct(product,this.number);
  }

}
