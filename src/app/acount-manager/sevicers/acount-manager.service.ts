import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcountManagerService {
  public user;
  constructor(
    public http : HttpClient,
  ) { }
  getUser(API): Observable<any>{
    this.user = this.http.get(API);
    return this.http.get(API);
  };
  putUser(user, API):Observable<any>{
    return this.http.put(API,user);
  };
  postUser(user,API):Observable<any>{
    return this.http.post(API,user);
  };
  deleteUser(API):Observable<any>{
    return this.http.delete(API);
  };
  //tranfer data
  public data = new BehaviorSubject(null);
  public currentdata = this.data.asObservable();
  changedata(data: any){
    this.data.next(data);
  }
  //tranfer user
  public users = new BehaviorSubject(null);
  public currentuser = this.users.asObservable();
  changeuser(users: any){
    this.users.next(users);
  }
  //tranfer Personalpage
  public Person = new BehaviorSubject(null);
  public currentPage = this.Person.asObservable();
  changePage(Person: any){
    this.Person.next(Person);
  }
}
