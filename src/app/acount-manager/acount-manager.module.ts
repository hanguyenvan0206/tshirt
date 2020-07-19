import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReactiveFormsModule } from '@angular/forms'
//components
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PersonalComponent } from './components/personal/personal.component';
//router
import { routers } from './acount.routes';
import { ValidateComponent } from './components/validate/validate.component';



@NgModule({
  declarations: [

  RegisterPageComponent,

  LoginPageComponent,

  ValidateComponent,

  PersonalComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    CarouselModule,
    ReactiveFormsModule,
    RouterModule.forChild(routers)
  ]
})
export class AcountManagerModule { }
