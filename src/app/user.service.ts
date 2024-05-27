import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userdata } from './usermodel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any;
  photo1: any;
 

  constructor(private http:HttpClient) { }

  setUser(data:any):Observable<any>{
    return this.http.post("http://localhost:3000/users/",data);
  }

  uploadImage(imageData: any): Observable<any> { 
    return this.http.post('http://localhost:3000/images', { image: this.photo1 });
  }

  getUser() {
    return this.http.get<userdata>("http://localhost:3000/users/");
    
  }
   
  
}
