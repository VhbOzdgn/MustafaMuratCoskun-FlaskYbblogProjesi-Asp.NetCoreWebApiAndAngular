import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MayvalidationService } from 'src/app/services/mayvalidation.service';

declare let alertify:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string= '';

  constructor(public myValidation: MayvalidationService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }

  get getControls(){
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(res => {
        this.errorMessage = '';
        alertify.success(`Hoşgeldin ${this.authService.helper.decodeToken(localStorage.getItem("YbBlogToken") || undefined).unique_name}`);
        this.router.navigateByUrl('/home');
      }, error => {
        this.errorMessage = error.error.error;
        alertify.error("Giriş işlemi başarısız!");
      });
    }
  }



}
