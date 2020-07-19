import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router';

import { AcountManagerService } from './../../sevicers/acount-manager.service';
import { ProductManagerService } from './../../../product-manager/services/product-manager.service';
import { User } from './../../../models/user.class';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public message: string = null;
  public user = new User;
  public Subscription: Subscription;
  public API = 'https://5de8db5d9578cb001487b566.mockapi.io/user';
  public API1 = 'https://5de8db5d9578cb001487b566.mockapi.io/currentuser';
  public index: number;
  public alert: string = null;
  constructor(
    public AcountManagerService: AcountManagerService,
    public Router: Router,
    public ProductManagerService: ProductManagerService
  ) { }

  ngOnInit() {
    this.AcountManagerService.currentdata.subscribe(message => this.message = message);
  }
  onSubmit(){
    console.log(this.user);
    this.Subscription = this.AcountManagerService.getUser(this.API).subscribe(data=>{
      //console.log(data);
      for( let i = 0; i<data.length; i++){
        if(this.user.email == data[i].email){
          this.index = i;
        }
      };
      console.log(this.user.password);
      console.log(data[this.index].password);
      if(this.index != null){
        if(this.user.password.trim() == data[this.index].password.trim()){
          this.Subscription = this.AcountManagerService.getUser(`${this.API}/${this.index+1}`).subscribe(data=>{
            this.user = data;
            console.log(this.user);
            this.Router.navigate(['index']);
            this.AcountManagerService.changeuser(this.user);
            this.Subscription = this.AcountManagerService.postUser(this.user, this.API1).subscribe(data=>{
              console.log(data);
              this.ProductManagerService.getcart();
            },error=>{
              console.log(error)
            });
          },error=>{
            console.log(error)
          });
        }else{
          this.alert = 'Email hoặc mật khẩu đăng nhập chưa chính xác'
        }
      }else{
        this.alert = 'Email hoặc mật khẩu đăng nhập chưa chính xác'
      }
      console.log(this.index);
    },error=>{
      console.log(error)
    });
  }
}
