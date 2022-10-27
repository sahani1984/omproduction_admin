import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImgCropComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = "./assets/images/image-placeholder.svg"

  constructor(public dialogRef: MatDialogRef<ImgCropComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageCropperDialogModel) {
    this.imageChangedEvent = data
    console.log(data)
  }
  ngOnInit(): void {
  }

  cropImage() {
    this.dialogRef.close({ data: this.croppedImage  });
  }

  /**IMAGE CROPED FUNCTIONALITY**/
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(event)
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event)
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

}

export class ImageCropperDialogModel {
  constructor(public event:Event) {
  }

}
