import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'administrator';
  constructor(private authService:AuthService, private router:Router){
    let status = !!sessionStorage.getItem('isloggedIn');
    if(status){
      authService.setLoggedIn();
    } else {
      authService.isLoggedIn = false;
      this.router.navigate(['/'])
    }

  }
}
