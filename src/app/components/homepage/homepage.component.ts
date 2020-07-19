import { Component, OnInit } from '@angular/core';
import { ProductManagerService } from './../../product-manager/services/product-manager.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public API1 :string = "http://5de8ab9e9578cb001487b304.mockapi.io/hightlightProduct";
  constructor(
    public ProductManagerService:ProductManagerService
  ) { }

  ngOnInit() {
    this.ProductManagerService.setAPI(this.API1);
  }
}
