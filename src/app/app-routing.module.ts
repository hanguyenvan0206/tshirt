import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { InformationPageComponent } from './components/information-page/information-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ControlPageComponent } from './components/control-page/control-page.component';
//guard
import { ControlGuard } from './shared/services/guards/control.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: HomepageComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'information',
    component: InformationPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'control',
    component: ControlPageComponent,
    canActivate: [ControlGuard]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
