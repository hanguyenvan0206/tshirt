import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {ProductManagerService} from './../../../product-manager/services/product-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ControlGuard implements CanActivate {
  public Subscription: Subscription;
  public API = 'http://5de8db5d9578cb001487b566.mockapi.io/currentuser';
  public currentUser;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.Subscription = this.ProductManagerService.getProduct(this.API).subscribe(data=>{
      this.currentUser = data[0]
    });
    if(this.currentUser.username == 'admin'){
      return true
    }else{
      return false;
    }

  }
  constructor(
    public http : HttpClient,
    public ProductManagerService: ProductManagerService
  ) { }
  
}
