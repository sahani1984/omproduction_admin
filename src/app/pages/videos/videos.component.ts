import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OmproductionDbService } from 'src/app/services/omproduction-db.service';
import { map } from 'rxjs/operators'
import { ConfirmComponent, ConfirmDialogModel } from 'src/app/partial/confirm/confirm.component';
import { AppConstant } from 'src/app/utilities/app-constant';
import { MatDialog } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ImgCropComponent } from 'src/app/partial/image-cropper/image-cropper.component';

export interface DialogData {
    data:any;
}

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videoform: FormGroup;  
  isEditmode: boolean = false;
  isLoading:boolean = false;
  constructor(
    private dialog: MatDialog,
    private omDbServices: OmproductionDbService,
    private fb: FormBuilder) {
    this.initform();
  }

  ngOnInit(): void {
    this.getVideos()
  }

  /**GET VIDEOS**/
  videoList: any = [];
  getVideos() {
    this.isLoading = true;
    this.omDbServices.getVideos()
      .pipe(map(res => {
        let data = [];
        for (let key in res) {
          data.push({ id: key, ...res[key] })
        }
        return data.reverse();
      }))
      .subscribe(
        res => {
          this.videoList = res;
          console.log(res);
        },
        err => console.log(err),
        () => this.isLoading = false
      )
  }

  onSubmitform(data: {}) {
    if (this.isEditmode) this.updateVideo(data);
    else this.savevideo(data);

  }

  
  savevideo(data: any) {
    data["videoThumbnail"] = this.croppedImage;   
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_SAVE);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      maxWidth: '400px',
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogRes => {
      if (dialogRes) {
        this.omDbServices.postVideos(data).subscribe(
          res => {
            console.log(res);
            this.resetform();
            this.getVideos();
          },
          err => console.log(err)
        )
      }
    })
  }

  updateVideo(data: any) {
    data["videoThumbnail"] = this.croppedImage;
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_UPDATE);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      maxWidth: '400px',
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogRes => {
      if (dialogRes) {
        this.omDbServices.updateVideo(data, this.idsforupdate).subscribe(
          res => {
            console.log(res);
            this.resetform();
            this.getVideos();
          },
          err => console.log(err)
        )
      }
    })
  }

  deleteVideo(id: string) {
    const dialogData = new ConfirmDialogModel('Confirm', AppConstant.CONFIRMATION_DELETE);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      maxWidth: '400px',
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogRes => {
      if (dialogRes) {
        this.omDbServices.deleteVideo(id).subscribe(
          res => {         
            this.getVideos();
            console.log(res);
          },
          err => console.log(err)
        )
      }
    })
  }


  idsforupdate: any = ""
  editVideo(ids: string) {
    this.isEditmode = true;
    this.idsforupdate = ids;
    let data = this.videoList.filter((item: any) => item.id === ids)[0];
    this.videoform.patchValue({
      videoUrl: data.videoUrl,
      title: data.title
    })
    this.croppedImage = data.videoThumbnail;
  }

  initform() {
    this.videoform = this.fb.group({
      videoUrl: ["", [Validators.required]],
      title: ["", Validators.required],
      videoThumbnail:["", [Validators.required]]
    })
  }

  resetform() {
    this.videoform.reset();
    this.isEditmode = false;
    this.idsforupdate = ""
    this.croppedImage = "./assets/images/image-placeholder.jpeg"
  }
   
  /**IMAGE CROPED FUNCTIONALITY**/
  imageChangedEvent: any = ""; 
  croppedImage: any = "./assets/images/image-placeholder.jpeg"
  fileChangeEvent(event: any): void {     
    this.imageChangedEvent = event;
    const dialogRef = this.dialog.open(ImgCropComponent, {
      width:'500px',
      maxWidth:'500px',
      data:event
    })
    dialogRef.afterClosed().subscribe(res=> {
       console.log(res);     
       this.croppedImage = res["data"];
    });
  }

  
}
