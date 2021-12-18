import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare let alertify:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }


  logout(){
    let username = this.authService.helper.decodeToken(localStorage.getItem("YbBlogToken") || undefined).unique_name;
    this.authService.logout();
    if(!this.loggedIn()){
      alertify.warning(`Hoşçakal ${username}`);
      // this.authService.decodedToken = '';
      this.router.navigateByUrl('/home');
    }
    else{
      alertify.error("Bir hata oluştu!\nÇıkış işlemi başarısız.");

    }
  }

  loggedIn(){
    return this.authService.loggedIn();
  }
}
