import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isLoggedIn:boolean = false;

  constructor() { 
    this.isLoggedIn = false;
  }

  setLoggedIn(){
    this.isLoggedIn = true;
  }
  
  getLoggedIn(){
    return this.isLoggedIn;
  }

  


}
