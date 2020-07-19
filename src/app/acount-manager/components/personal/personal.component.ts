import { Component, OnInit, OnDestroy } from '@angular/core';
import { AcountManagerService } from './../../sevicers/acount-manager.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit, OnDestroy {
  public Subscription: Subscription;
  public Form : FormGroup;
  public passchange: boolean = false;
  public Page;
  public user;
  public API = 'https://5de8db5d9578cb001487b566.mockapi.io/user';
  public API1 = 'https://5de8db5d9578cb001487b566.mockapi.io/currentuser';
  public index;
  public message: string = null;
  constructor(
    public AcountManagerService: AcountManagerService,
    public Router: Router,
    public FormBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.creatForm();
    this.Subscription = this.AcountManagerService.currentPage.subscribe(Person => this.Page = Person);
    this.Subscription = this.AcountManagerService.getUser(this.API1).subscribe(data=>{
      this.user = data[0];
    },error=>{
      console.log(error)
    });
  }
  creatForm(){
    this.Form = this.FormBuilder.group({
     password: ['',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]],
    confirmPass: ['',[
      Validators.required
    ]]
    })
  }
  changePass(){
    this.passchange = !this.passchange;
  }
  ChangePage(value){
    this.Page = value;
  }
  ngOnDestroy(){
    if(this.Subscription){
      this.Subscription.unsubscribe();
    }
  }
  get alert(){
    for(let err in this.Form.controls.password.errors){
      if(this.Form.controls.password.dirty){
        return this.getErrorMessage(err, this.Form.controls.password.errors[err]);
      }
    };
    return null;
  }
  get alert1(){
    for(let err in this.Form.controls.confirmPass.errors){
      if(this.Form.controls.confirmPass.dirty){
        return this.getErrorMessage(err, this.Form.controls.confirmPass.errors[err]);
      };
    };
    if(this.Form.value.password != this.Form.value.confirmPass){
      return 'Nhập lại mật khẩu chưa chính xác'};
    return null;
  }
  getErrorMessage(err,value){
    let messages = {
        'required': `Nhập thông tin`,
        'minlength': `Minlength: ${value.requiredLength} character!`,
        'maxlength' : `Maxlength: ${value.requiredLength} character!`,
      }
      return messages[err];
    }
  onSubmit(){
    console.log(this.Form);
    if(this.Form.status == 'VALID' &&this.Form.value.password == this.Form.value.confirmPass){
      this.Subscription = this.AcountManagerService.getUser(this.API).subscribe(data=>{
        console.log(data)
        this.findIndex(data);
        this.user.password = this.Form.value.password;
        this.Subscription = this.AcountManagerService.putUser(this.user, `${this.API}/${this.index + 1}`).subscribe(data=>{
          console.log(data);
          this.message = 'Đã thay đổi mật khẩu thành công';
        },error=>{
            console.log(error)
          });
        
      },error=>{
        console.log(error)
      });
    } 
  }
  findIndex(array){
    for(let i = 0; i< array.length; i++){
      if(this.user.email == array[i].email){
        this.index = i;
      }
    }
  }
}
