import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
 selectedIndex:any='1'
  constructor(private router:Router, route:ActivatedRoute) {
    
   }
  ngOnInit(): void {
    this.setActiveTabs();
  }

  showTabs(url:any, index:any){
     this.selectedIndex = index
      this.router.navigate([url])
  }

  setActiveTabs(){
    if (this.router.url == '/edit/about/company') this.selectedIndex = '1'
    if (this.router.url == '/edit/about/photo-gallery') this.selectedIndex = '2'
    if (this.router.url == '/edit/about/videos') this.selectedIndex = '3'
  }

}
