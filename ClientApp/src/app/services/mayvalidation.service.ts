import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MayvalidationService {

  constructor() { }


  getValidationMessages(f: AbstractControl, name: string): string | void {
    // console.log(f.errors);

    for (let errorName in f.errors) {
      switch (errorName) {
        case "required":
          return `${name} alanı boş bırakılamaz!`;
        case "minlength":
          return `${name} alanı en az ${f.errors.minlength.requiredLength} karakter olmalıdır!`;
        case "maxlength":
          return `${name} alanı en fazla ${f.errors.maxlength.requiredLength} karakter olmalıdır!`;
          case "email":
            return `${name} alanı uygun formatta olmalıdır!`;
        default:
          return "Bir hata oluştu!";
      }
    }
  }
}
