import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'
//service
import { ProductManagerService } from './../../product-manager/services/product-manager.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
  public API: string = 'https://5de8db5d9578cb001487b566.mockapi.io/cart';
  public API1 = 'https://5de8db5d9578cb001487b566.mockapi.io/currentuser';
  public Subscription: Subscription;
  public carts;
  public totalPaid: number = 0;
  public alert: string;
  public currentUser;
  public index;
  constructor(
    public ProductManagerService :ProductManagerService,
    public Router: Router
  ) { }

  ngOnInit() {
    this.loadCart(this.API);
  }
  loadCart(API){
    this.Subscription = this.ProductManagerService.getProduct(this.API1).subscribe(data=>{
      this.currentUser = data[0];
      if(this.currentUser){
        let cart = [];
        this.Subscription = this.ProductManagerService.getProduct(API).subscribe(data=>{
          console.log(data)
          data = data.filter(x=>{
            return x.username == this.currentUser.username;
          });
          console.log(data)
          this.carts = data;
          console.log(this.carts)
          let paid = 0;
          for(let j = 0; j < this.carts.length; j++){
            paid += this.carts[j].price*this.carts[j].amount;
          }
          this.totalPaid = paid;
          console.log(this.totalPaid)
        },error=>{
          console.log(error)
        });
    
      }else{
        this.carts = [];
        console.log(this.carts)
      }
  },error=>{
    console.log(error)
  });
  
    
  }
  ngOnDestroy(): void {
    if(this.Subscription){
      this.Subscription.unsubscribe();
    }
  }
  onDeleteCart(cart){
    this.index = null;
    this.Subscription = this.ProductManagerService.getProduct(this.API1).subscribe(data=>{
      this.currentUser = data[0];
      if(this.currentUser){
        this.Subscription = this.ProductManagerService.getProduct(this.API).subscribe(data=>{
          console.log(data)
          
         for(let i = 0; i<data.length; i++){
           if(cart.name == data[i].name && this.currentUser.username == data[i].username){
             this.index = i;
           }
         };
         if(this.index !=null){
           this.Subscription = this.ProductManagerService.deleteData(`${this.API}/${data[this.index].id}`).subscribe(data=>{
            console.log(data);
            this.ProductManagerService.getcart();
            this.loadCart(this.API);
           },error=>{
            console.log(error)
          });

         }
         
        },error=>{
          console.log(error)
        });
    
      }
  },error=>{
    console.log(error)
  });  
  }
  // minus & plus
  buyProduct(product, value){
    console.log(product)
    let newamount = product.amount + value;
    if(newamount<=1){
      newamount=1
    }
    let newdata = {
      name: product.name,
      img: product.img,
      price: product.price,
      status: product.status,
      star: product.star,
      des: product.des,
      amount: newamount
    }
    this.index = null;
    this.Subscription = this.ProductManagerService.getProduct(this.API1).subscribe(data=>{
      this.currentUser = data[0];
      if(this.currentUser){
        this.Subscription = this.ProductManagerService.getProduct(this.API).subscribe(data=>{
          console.log(data)
         for(let i = 0; i<data.length; i++){
           if(product.name == data[i].name && this.currentUser.username == data[i].username){
             this.index = i;
           }
         };
         if(this.index !=null){
           this.Subscription = this.ProductManagerService.updateComment(newdata,`${this.API}/${data[this.index].id}`).subscribe(data=>{
            console.log(data);
            this.ProductManagerService.getcart();
            this.loadCart(this.API);
           },error=>{
            console.log(error)
          });

         }
         
        },error=>{
          console.log(error)
        });
    
      }
  },error=>{
    console.log(error)
  });  
  }
  continueBuy(){
    this.Router.navigate(['product']);
  }
}
