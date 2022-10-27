import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { ConfirmComponent, ConfirmDialogModel } from 'src/app/partial/confirm/confirm.component';
import { ImgCropComponent } from 'src/app/partial/image-cropper/image-cropper.component';
import { CommonService } from 'src/app/services/common.service';
import { AppConstant } from 'src/app/utilities/app-constant';
import { FileUpload } from 'src/app/utils/model';
export class Photo {
  public photo: string;
  public title: string; 
}

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  model = new Photo();
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  fileUploads: any=[]; 
  isLoading:boolean = false;

  constructor(
    private dialog:MatDialog, 
    private commonService:CommonService,
    private fStorage:AngularFireStorage) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.commonService.getFiles(100).snapshotChanges().pipe(
      map(changes =>       
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      console.log(this.fileUploads);
      this.isLoading = false;
    });
  }
     
  


 
  imageChangedEvent: any = "";
  croppedImage: any = "./assets/images/image-placeholder.jpeg"
  pathstring:any=""
  fileChangeEvent(event: any): void {  
    this.selectedFiles = event.target.files;   
    if (event.target.files.length === 0)
      return;   
    var reader = new FileReader();    
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.croppedImage = reader.result;
   }
  }

  
  downloadURL: Observable<string>;
  fb:any;
  uploadImage(){   
    const file:any = this.selectedFiles.item(0);   
    const title: any = this.model.title;   
    //this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);      
    this.commonService.pushFileToStorage(this.currentFileUpload, title).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
        this.model.photo = "";
        this.model.title = "";   
        this.croppedImage = "./assets/images/image-placeholder.jpeg"
      },
      error => {
        console.log(error);
      }
    );
  
   
    // let photoTitle = this.model.title?.trim().split(' ').join('-');
    // let imgarr = this.pathstring.name.split('.')
    // let extension = '.' + imgarr[imgarr.length - 1];
    // let imagename = Date.now() + '-' + photoTitle + extension;  
  
    // const filePath = `PhotoGallery/${imagename}`;
    // const fileRef = this.fStorage.ref(filePath);
    // const task = this.fStorage.upload(`PhotoGallery/${imagename}`, this.pathstring)
    // task.snapshotChanges().pipe(
    //     finalize(() => {
    //       this.downloadURL = fileRef.getDownloadURL();
    //       this.downloadURL.subscribe(url => {
    //         if (url) {
    //           this.fb = url;
    //           console.log(url);
    //         }         
    //       }, err=> console.log(err));
    //     })
    //   )
    //   .subscribe(url => {
    //     if (url) {        
    //        this.model.photo = "";
    //        this.model.title = "";
    //     }
    //   });
  }
  

  deleteFileUpload(fileUpload:FileUpload): void {   
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_DELETE);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      maxWidth: '400px',
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogRes => {
      if (dialogRes) {
        this.commonService.deleteFile(fileUpload);
        return true;
      }     
    });

    
  }


}
