import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from '../utilities/api_url';
import { AppConstant } from '../utilities/app-constant';

@Injectable({
  providedIn: 'root'
})


export class OmproductionDbService {
   baseUrl:string=''
  constructor(private http:HttpClient ) {
    this.baseUrl = AppConstant.baseUrl;
   }

   headers = new HttpHeaders({'Content-Type':'application/json'});

   postVideos(data:any):Observable<any>{
     return this.http.post<any>(this.baseUrl+ApiUrls.videoLists, data, {headers:this.headers})
   }
   getVideos():Observable<any>{
     return this.http.get<any>(this.baseUrl + ApiUrls.videoLists, {headers:this.headers});
   }
 
   deleteVideo(ids:any):Observable<any> {
     return this.http.delete<any>(this.baseUrl +`videolists/${ids}.json`, {headers:this.headers})
   }

   updateVideo(data:any, ids:any):Observable<any>{
     return this.http.put<any>(this.baseUrl+`videolists/${ids}.json`, data, {headers:this.headers})
   }

}
