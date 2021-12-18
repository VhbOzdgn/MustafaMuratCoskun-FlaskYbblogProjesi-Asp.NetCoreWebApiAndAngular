import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MayvalidationService } from 'src/app/services/mayvalidation.service';

declare let alertify:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errorMessages: any[] = [];

  constructor(public myValidation: MayvalidationService, private authService: AuthService, private router: Router) { }

  get getControls() {
    return this.registerForm?.controls;
  }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.addUser(this.registerForm.value).subscribe(res => {
        this.errorMessages = [];
        alertify.success(`${res.userName} kullanıcı adıyla kayıt işleminiz başarılı olmuştur.`);
        this.router.navigateByUrl('/login');
      }, error => {
        this.errorMessages = error.error;
        alertify.error("Kayıt işlemi başarısız!");
      });
    }
  }

}
