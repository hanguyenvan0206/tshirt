import { Routes } from '@angular/router';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';

export const routers: Routes = [
    {
        path: 'product',
        component: ProductPageComponent
    },
    {
        path: 'product/:id',
        component: ProductDetailPageComponent
    }
]