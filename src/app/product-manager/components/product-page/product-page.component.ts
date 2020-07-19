import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from './../../../models/product.class';
import { orderBy } from 'lodash';

import { ProductManagerService } from './../../../product-manager/services/product-manager.service';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  public listProduct: string = 'Tất cả các sản phẩm';
  public search: string ='';
  public colors = ['red', 'blue', 'green', 'orange', 'yellow', 'gray']
  public filterPrices = [
    'Giá dưới 1.000.000đ', 
  '1.000.000đ - 2.000.000đ', 
  '2.000.000đ - 3.000.000đ',
  '3.000.000đ - 5.000.000đ',
  '5.000.000đ - 10.000.000đ',
  'Giá trên 10.000.000đ'
 ]
 public menus = [
   {
     img: './../../../../assets/img/icon1.jpg',
     text: 'Công sở'
   },
   {
    img: './../../../../assets/img/icon2.jpg',
    text: ' Văn phòng'
  },
  {
    img: './../../../../assets/img/icon3.jpg',
    text: 'Ghế bành'
  },
  {
    img: './../../../../assets/img/icon4.jpg',
    text: 'Kệ sách'
  },
  {
    img: './../../../../assets/img/icon5.jpg',
    text: 'Phòng ngủ'
  }
 ]
 public searchs = [
   'Tất cả',
   'Tên A-Z',
   'Tên Z-A',
   'Còn hàng',
   'Giá thấp đến cao',
   'Giá cao xuống thấp'
 ];
 public Sort;
  constructor(
    public ProductManagerService :ProductManagerService
  ) { }
  public products : Product;
  public Subscription: Subscription;
  public API1 :string = "https://5de8ab9e9578cb001487b304.mockapi.io/hightlightProduct";
  ngOnInit() {
    this.loadProduct(this.API1);
    
  }
  loadProduct(API){
    this.ProductManagerService.currentSearch.subscribe(search => {
      this.search = search;
      console.log(this.search);
      this.Subscription = this.ProductManagerService.searchProduct(API).subscribe(data=>{
        if(this.search == ''){
          this.products = data;
          this.listProduct == 'Tất cả các sản phẩm'
        }else{
          this.products = data.filter(x=>{
            return x.name.toLowerCase().indexOf( this.search.toLowerCase()) != -1;
          });
        }
        
      },error=>{
        console.log(error)
      });
    })
    this.ProductManagerService.currentMenu.subscribe(menu => {
      this.listProduct = menu;
      console.log(this.listProduct);
      this.Subscription = this.ProductManagerService.searchProduct(API).subscribe(data=>{
        if(this.listProduct == 'Tất cả các sản phẩm'){
          this.products = data;
        }else{
          this.products = data.filter(x=>{
            return x.group == this.listProduct;
          });
        }
        
      },error=>{
        console.log(error)
      });
    })
    
  }
  colorSearch(color){
    console.log(color);
    this.Subscription = this.ProductManagerService.searchProduct(this.API1, color).subscribe(data=>{
      let result = data.filter(x=>{
        return x.color == color;
      })
      this.products = result;
      console.log(result)
    },error=>{
      console.log(error)
    });
  }
  typeSearch(type){
    console.log(type);
    this.Subscription = this.ProductManagerService.searchProduct(this.API1,type).subscribe(data=>{
      let result = data.filter(x=>{
        return x.type == type;
      })
      this.products = result;
      console.log(result)
    },error=>{
      console.log(error)
    });
  }
  onSort(search){
    console.log(search);
    this.Subscription = this.ProductManagerService.searchProduct(this.API1).subscribe(data=>{
      let result;
      switch(search){
        case 'Tên A-Z':
          result = orderBy(data, ['name'], ['asc']);
        break;
        case 'Tên Z-A':
          result = orderBy(data, ['name'], ['desc']);
        break;
        case 'Giá thấp đến cao':
          result = orderBy(data, ['price'], ['asc']);
        break;
        case 'Giá cao xuống thấp':
          result = orderBy(data, ['price'], ['desc']);
        break;
        case 'Còn hàng':
          result = data.filter(x=>{
            return x.status == true;
          })
        break;
        case 'Tất cả':
            result = data;
            this.listProduct = 'Tất cả các sản phẩm';
      }
      this.products = result;
      console.log(result)
    },error=>{
      console.log(error)
    });
  }
  findPrice(filterPrice){
    console.log(filterPrice);
    this.Subscription = this.ProductManagerService.searchProduct(this.API1).subscribe(data=>{
      let result;
      switch(filterPrice){
        case 'Giá dưới 1.000.000đ':
          result = data.filter(x=>{
            return x.price < 1000000;
          })
        break;
        case '1.000.000đ - 2.000.000đ':
          result = data.filter(x=>{
            return x.price > 1000000 && x.price < 2000000;
          })
        break;
        case '2.000.000đ - 3.000.000đ':
          result = data.filter(x=>{
            return x.price > 2000000 && x.price < 3000000;
          })
        break;
        case '3.000.000đ - 5.000.000đ':
          result = data.filter(x=>{
            return x.price > 3000000 && x.price < 5000000;
          })
        break;
        case '5.000.000đ - 10.000.000đ':
          result = data.filter(x=>{
            return x.price > 5000000 && x.price < 10000000;
          })
        break;
        case 'Giá trên 10.000.000đ':
          result = data.filter(x=>{
            return x.price > 10000000;
          })
        break;
        default:
            result = data;
      }
      this.products = result;
      console.log(result)
    },error=>{
      console.log(error)
    });
  }
  addtocart(product){
    product.amount = 1;
    this.ProductManagerService.buyProduct(product, 1);
    
  }
}
