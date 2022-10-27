import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform:FormGroup
  constructor(private fb:FormBuilder, private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.initform();
  }

  login(data:any){
      if(data.username === 'admin' && data.password === 'admin'){
        sessionStorage.setItem('isloggedIn', 'true');
        this.authService.setLoggedIn();
        this.router.navigate(['/dashboard']);
      }

  }

  initform(){
    this.loginform = this.fb.group({
      username:["", [Validators.required]],
      password:["", [Validators.required]]
    })
  }

}
