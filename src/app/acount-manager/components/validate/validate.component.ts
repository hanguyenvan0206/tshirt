import { Component, OnInit, Input } from '@angular/core';

import { AcountManagerService } from './../../sevicers/acount-manager.service';
@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {
  @Input('control') control;
  @Input ('name-control') controlname;
  @Input('Phoneerr') Phoneerr;
  @Input('Emailerr') Emailerr;
  @Input('Usererr') Usererr;
  constructor(
    public AcountManagerService: AcountManagerService
  ) { }
  
  get message(){
    //console.log(this.control);
    for(let err in this.control.errors){
      if(this.control.dirty){
        return this.getErrorMessage(err, this.control.errors[err]);
      }
    };
    if(this.Phoneerr != null){
      return this.Phoneerr;
    }
    if(this.Emailerr != null){
      return this.Emailerr
    }
    if(this.Usererr != null){
      return this.Usererr
    }
    return null;
  }
  getErrorMessage(err,value){
  let messages = {
      'required': `${this.controlname} is invalid!`,
      'minlength': `Minlength: ${value.requiredLength} character!`,
      'maxlength' : `Maxlength: ${value.requiredLength} character!`,
      'pattern': `${this.controlname} is invalid!`
    }
    return messages[err];
  }
  ngOnInit() {
    
  }

}
