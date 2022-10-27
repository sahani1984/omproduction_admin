import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  openmenu:boolean=false
  constructor(private router:Router) { }
  ngOnInit(): void {    
  }
  handleDropdown(){   
    if(this.openmenu == true){
      this.openmenu = false
    }else{
      this.openmenu = true
    }
  }

  logout(){
    this.router.navigate(['/']);
    sessionStorage.removeItem('isloggedIn');
  }

}
