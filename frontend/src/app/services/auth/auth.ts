import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  constructor(){ }

  // private to prevent modifications
  private isLoggedIn=false

  login(){
    this.isLoggedIn=true
  }

  logout(){
    this.isLoggedIn=false
  }

  // call this to know status
  showStatus(){
    return this.isLoggedIn
  }
}
