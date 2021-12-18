import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

declare let alertify:any;

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router) { }
  canActivate(): boolean {
    if(this.authService.loggedIn()){
      return true;
    }
    alertify.message("Bu sayfayı görüntüleyebilmek için lütfen giriş yapın");
    this.router.navigate(['/login']);
    return false;
  }
}
