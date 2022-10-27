import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { CompanyComponent } from './pages/company/company.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditComponent } from './pages/edit/edit.component';
import { EquipmentsComponent } from './pages/equipments/equipments.component';
import { HomeComponent } from './pages/home/home.component';
import { InstituteComponent } from './pages/institute/institute.component';
import { PhotoGalleryComponent } from './pages/photo-gallery/photo-gallery.component';
import { ServicesComponent } from './pages/services/services.component';
import { VideosComponent } from './pages/videos/videos.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:"", redirectTo:"/", pathMatch:"full"},
  {path:"", component:LoginComponent},
  {path: "dashboard", component: DashboardComponent,canActivate:[AuthGuard] },
   {path:"edit", canActivate:[AuthGuard], component:EditComponent, children:[
     { path: "home", component: HomeComponent },
     { path: "about", component: AboutComponent, children:[
       {path: "", redirectTo:"/edit/about/company", pathMatch:'full'},
       {path:"company", component:CompanyComponent},
       {path:"photo-gallery", component:PhotoGalleryComponent},
       {path:"videos", component:VideosComponent}
     ]},
     { path: "services", component: ServicesComponent },
     { path: "equipments", component: EquipmentsComponent },
     { path: "institute", component: InstituteComponent },
     { path: "contact", component: ContactComponent }
   ]}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
