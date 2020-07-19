import { Injectable } from '@angular/core';
import { Product } from './../../models/product.class';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class ProductManagerService {
  public product;
  public API :string;
  public products;
  public Subscription: Subscription;
  public cartAmount = new BehaviorSubject(0);
  public currentAmount = this.cartAmount.asObservable();
  public amount: number;
  public menu = new BehaviorSubject('Tất cả các sản phẩm');
  public currentMenu = this.menu.asObservable();
  public search = new BehaviorSubject('');
  public currentSearch = this.search.asObservable();
  public currentUser;
  public index: number;
  public cart;
  constructor(
    public http : HttpClient,
    public Router : Router
  ) { }
  changeSearch(search: string){
    this.search.next(search);
  }
  changeMenu(menu: string){
    this.menu.next(menu);
  }
  changeMessage(amount: number) {
    this.cartAmount.next(amount);
  }
  onDeleteCart(API,product):Observable<any>{
    return this.http.put(API,product);
  }
  getProduct(API): Observable<any>{
    this.product = this.http.get(API);
    return this.http.get(API);
  }
  searchProduct(API, color?, group?, type?): Observable<any>{
    this.product = this.http.get(API);
    return this.http.get(API);
  }
  updateComment(comment, API):Observable<any>{
    return this.http.put(API,comment);
  }
  postnewComment(comment,API):Observable<any>{
    return this.http.post(API,comment);
  }
  deleteData(API){
    return this.http.delete(API);
  }
  setAPI(api){
    this.API = api;
  }
  get api():string {
    return this.API;
  }
  //ADD TO CART
  addtocart(product, amount){
    this.index = null;
  let API = "https://5de8db5d9578cb001487b566.mockapi.io/cart";
  let API1 = "https://5de8db5d9578cb001487b566.mockapi.io/currentuser";
  this.Subscription = this.getProduct(API1).subscribe(data=>{
      this.currentUser = data[0];
  },error=>{
    console.log(error)
  });

   this.Subscription = this.getProduct(API).subscribe(data=>{

     if(data == []){
        let cart = {
              username: this.currentUser.username,
              name: product.name,
              img: product.img,
              price: product.price,
              status: product.status,
              star: product.star,
              des: product.des,
              amount: amount
        }
        this.Subscription = this.postnewComment(cart,API).subscribe(data=>{
          //console.log(data);
          this.getcart();
        },error=>{
          console.log(error);
        });
     }else{
      //console.log(data)
      for(let i = 0; i<data.length; i++){
        console.log(this.currentUser);
        if(product.name == data[i].name && this.currentUser.username == data[i].username){
          //console.log(data[i])
          console.log(product.name)
          console.log(data[i].name)
          this.index = i;
          this.cart = data[i];
          console.log(this.index)
          }
     }
     console.log(this.index)
      if(this.index != null){
        let cart = {
          username: data[this.index].username,
          name: product.name,
          img: product.img,
          price: product.price,
          status: product.status,
          star: product.star,
          des: product.des,
          amount: this.cart.amount + amount
      }
        this.Subscription = this.updateComment(cart,`${API}/${data[this.index].id}`).subscribe(data=>{
          console.log(data);
          this.getcart();
        },error=>{
          console.log(error)
        })
      }else{
        let cart = {
          username: this.currentUser.username,
          name: product.name,
          img: product.img,
          price: product.price,
          status: product.status,
          star: product.star,
          des: product.des,
          amount: amount
          }
          this.Subscription = this.postnewComment(cart,API).subscribe(data=>{
            //console.log(data);
            this.getcart();
          },error=>{
            console.log(error);
          });
      }
     }


  },error=>{
    console.log(error)
  });
  }
  // GET CART
  getcart(){
    let API: string = 'https://5de8db5d9578cb001487b566.mockapi.io/cart';
    let API1 = "https://5de8db5d9578cb001487b566.mockapi.io/currentuser";
    this.Subscription = this.getProduct(API1).subscribe(data=>{
      this.currentUser = data[0];
  },error=>{
    console.log(error)
  });
  if(this.currentUser){
    this.Subscription = this.getProduct(API).subscribe(data=>{
      let result = 0;
      data = data.filter(x=>{
        return x.username == this.currentUser.username;
      });
      for(let i=0; i < data.length; i++){
         result += data[i].amount;
      }
      this.amount = result;
      this.changeMessage(this.amount);
      console.log(this.amount);
     },error=>{
       console.log(error)
     });
  }else{
    //this.amount = 0;
    //this.changeMessage(this.amount);
  }

  }
  //CLICK BUY PRODUCT
  buyProduct(product, amount){
    let API = 'https://5de8db5d9578cb001487b566.mockapi.io/currentuser'
    this.Subscription = this.getProduct(API).subscribe(data=>{
      this.currentUser = data[0];
      if(this.currentUser){
        this.addtocart(product,amount);
      }else{
        this.Router.navigate(['login']);
      }
    },error=>{
      console.log(error)
    });
  }

}
