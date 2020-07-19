import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcountManagerService } from './../../sevicers/acount-manager.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  constructor(
    public FormBuilder: FormBuilder,
    public AcountManagerService: AcountManagerService,
    public Router: Router
  ) { }
    public registerForm : FormGroup;
    public Username = 'Username';
    public Password = 'Password';
    public Fullname = 'Fullname';
    public Email = 'Email';
    public Phone = 'Phone';
    public Subscription: Subscription;
    public API = 'https://5de8db5d9578cb001487b566.mockapi.io/user';
    public Emailerr: string = null;
    public Phoneerr: string = null;
    public Usererr: string = null;
  ngOnInit() {
    this.creatForm();
  }
  creatForm(){
    this.registerForm = this.FormBuilder.group({
      username: ['',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]
     ],
     password: ['',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]],
    fullname: ['',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]],
    email: ['',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]],
    phone: ['',[
      Validators.required,
      Validators.minLength(9),
        Validators.maxLength(10)
    ]]
    })
  }
  ngOnDestroy(){
    if(this.Subscription){
      this.Subscription.unsubscribe();
    }
  }
  onSubmit(){
    console.log(this.registerForm);
    if(this.registerForm.status == "VALID"){
      this.Subscription = this.AcountManagerService.getUser(this.API).subscribe(data=>{
        for(let i = 0; i<data.length; i++){
          if(this.registerForm.value.email == data[i].email){
            this.Emailerr = 'Email đã tồn tại';
          };
          if(this.registerForm.value.phone == data[i].phone){
            this.Phoneerr = 'Số điện thoại đã tồn tại';  
          };
          if(this.registerForm.value.username == data[i].username){
            this.Usererr = 'Tên User đã tồn tại'; 
          };
        }
        if(this.registerForm.valueChanges.subscribe(data=>{
          if(data){
            this.Emailerr = null;
            this.Phoneerr = null;
            this.Usererr = null;
          }
        }))
        console.log(this.Emailerr);
        console.log(this.Phoneerr);
        console.log(this.Usererr);
        if(this.Emailerr == null && this.Phoneerr == null && this.Usererr == null){
          this.Subscription = this.AcountManagerService.postUser(this.registerForm.value, this.API).subscribe(data=>{
            console.log(data);
            this.Router.navigate(['login']);
            this.AcountManagerService.changedata('Chúc mừng bạn đã đăng ký tài khoản thành công! Vui lòng đăng nhập trước khi mua hàng.')
          },error=>{
            console.log(error)
          });
        };
      },error=>{
        console.log(error)
      });
    }
  }
}
