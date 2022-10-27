import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule, AngularFireStorage} from '@angular/fire/compat/storage';
import {environment} from '../environments/environment'


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from './utilities/material.module';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { EquipmentsComponent } from './pages/equipments/equipments.component';
import { InstituteComponent } from './pages/institute/institute.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EditComponent } from './pages/edit/edit.component';
import { VideosComponent } from './pages/videos/videos.component';
import { PhotoGalleryComponent } from './pages/photo-gallery/photo-gallery.component';
import { CompanyComponent } from './pages/company/company.component';
import { SafeUrlPipe } from './utilities/safe-url.pipe';
import { ConfirmComponent } from './partial/confirm/confirm.component';
import { ImgCropComponent } from './partial/image-cropper/image-cropper.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    EquipmentsComponent,
    InstituteComponent,
    ContactComponent,
    EditComponent,
    VideosComponent,
    PhotoGalleryComponent,
    CompanyComponent,
    SafeUrlPipe,
    ConfirmComponent,
    ImgCropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    AngularFireModule.initializeApp(environment.firebase),  
    AngularFireStorageModule
    
  ],
  providers: [AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
