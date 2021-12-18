import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appuser } from '../models/appuser';
import { LoginUser } from '../models/login-user';
import { RegisterUser } from '../models/register-user';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();
  // decodedToken:any ='';
  private apiUrl:string = "https://localhost:44314/api/auth";
  constructor(private httpClient:HttpClient) { }

  addUser(user:RegisterUser){
    return this.httpClient.post<Appuser>(`${this.apiUrl}/register`,user);
  }

  login(user:LoginUser){
    return this.httpClient.post<any>(`${this.apiUrl}/login`,user).pipe(map((data:any) => {
      if(data.token){
        localStorage.setItem("YbBlogToken",data.token);
        // this.decodedToken = this.helper.decodeToken(data.token);
      }
    }));
  }

  logout(){
    localStorage.removeItem('YbBlogToken');
  }

  loggedIn(){
    return !this.helper.isTokenExpired(localStorage.getItem("YbBlogToken") || undefined);
  }
}
