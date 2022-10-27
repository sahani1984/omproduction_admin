export class FileUpload{
  key: string;
  name: string;
  imageUrl: string;
  file: File;
  title:string;

  constructor(file: File) {
    this.file = file;
  }
}