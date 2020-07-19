import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './../../../models/user.class';
//Service
import { ProductManagerService } from './../../../product-manager/services/product-manager.service';
import { AcountManagerService } from './../../../acount-manager/sevicers/acount-manager.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  public cartamount: number = 0;
  public API: string = 'https://5de8ab9e9578cb001487b304.mockapi.io/cart';
  public API1 = 'https://5de8db5d9578cb001487b566.mockapi.io/currentuser';
  public Subscription: Subscription;
  public menus = ['Sản phẩm nổi bật', 'Sản phẩm khuyến mại', 'Nội thất văn phòng', 'Phòng bếp', 'Dụng cụ nhà bếp', 'Phòng khách'];
  public search: string;
  public user: User;
  public index;
  public currentUser;
  constructor(
    public Router: Router,
    public ProductManagerService :ProductManagerService,
    public ActivatedRoute: ActivatedRoute,
    public AcountManagerService: AcountManagerService
  ) { }

  ngOnInit() {
    this.getcart();
    this.ProductManagerService.currentAmount.subscribe(amount => this.cartamount = amount);
    this.AcountManagerService.currentuser.subscribe(user => this.user = user);
    this.getUser();
    
    this.ActivatedRoute.queryParams.subscribe(data=>{
     // console.log(data);
      this.ProductManagerService.changeSearch(data.search);
    })
  }
  getUser(){
    this.Subscription = this.AcountManagerService.getUser(this.API1).subscribe(data=>{
      this.user = data[0];
      //console.log(this.user)
    },error=>{
      console.log(error)
    });
  };
  logout(){
    this.user = null;
    this.Subscription = this.AcountManagerService.deleteUser(`${this.API1}/1`).subscribe(data=>{
      this.user = null;
      this.cartamount = 0;
      this.Router.navigate(['index'])
    },error=>{
      console.log(error)
    });
  }
  onPersonal(value){
    this.Router.navigate(['personal']);
    this.AcountManagerService.changePage(value);
  }
  ngOnDestroy(){
    if(this.Subscription){
      this.Subscription.unsubscribe();
    }
  }
  
  getcart(){
    let API: string = 'https://5de8db5d9578cb001487b566.mockapi.io/cart';
    let API1 = "https://5de8db5d9578cb001487b566.mockapi.io/currentuser";
    this.Subscription = this.ProductManagerService.getProduct(API1).subscribe(data=>{
      this.currentUser = data[0];
      console.log(this.currentUser)
      //console.log(data[0])
      if(this.currentUser){
        this.Subscription = this.ProductManagerService.getProduct(API).subscribe(data=>{
          let result = 0;
          data = data.filter(x=>{
            return x.username == this.currentUser.username;
          });
          for(let i=0; i < data.length; i++){
             result += data[i].amount;
          }
          this.cartamount = result;
          console.log(this.cartamount)
         },error=>{
           console.log(error)
         });
      }else{
        this.cartamount = 0;
        console.log(this.cartamount)
      }
  },error=>{
    console.log(error)
  });
  console.log(this.currentUser)
  
    
  }
  navigate(Url: string){
    this.Router.navigate([Url]);
  }
  menuClick(menu){
    //console.log(menu)
    this.ProductManagerService.changeMenu(menu);
  }
  onSearch(){
    this.Router.navigate(['product'], { queryParams: {search: this.search? this.search : ''}});
  }
}
