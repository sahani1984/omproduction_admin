import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../utils/model';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private basePath:any = '/PhotoGallery';
  constructor(
    private firebasedb: AngularFireDatabase,
    private storage:AngularFireStorage) { }


  pushFileToStorage(fileupload:FileUpload, title:string):Observable<number>{
    const filePath:any= `${this.basePath}/${fileupload.file.name}`;
    const storageRef:any = this.storage.ref(filePath);
    const uploadTask:any = this.storage.upload(filePath, fileupload.file);   
    uploadTask.snapshotChanges().pipe(
      finalize(()=>{
        storageRef.getDownloadURL().subscribe((downloadURL:any) => {
          console.log(downloadURL)
          fileupload.imageUrl = downloadURL;
          fileupload.name = Date.now()+'-' +fileupload.file.name;
          fileupload.title = title;
          this.saveFileData(fileupload);
        })
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

   private saveFileData(fileupload:FileUpload){
      this.firebasedb.list(this.basePath).push(fileupload);
    }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.firebasedb.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileupload: FileUpload): void {
    this.deleteFileDatabase(fileupload.key)
      .then(() => {
        this.deleteFileStorage(fileupload.name);
      })
      .catch((error:any) => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.firebasedb.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
 
}
