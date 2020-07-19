import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(
    public Router: Router
  ) { }
  navigate(Url:string){
    this.Router.navigate([Url]);
  }
}
