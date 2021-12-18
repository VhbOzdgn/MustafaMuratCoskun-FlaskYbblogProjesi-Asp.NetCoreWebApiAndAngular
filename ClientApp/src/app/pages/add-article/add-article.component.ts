import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { MayvalidationService } from 'src/app/services/mayvalidation.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
declare let alertify:any;

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  loading:boolean=false;
  errorTitle:any[]=[];
  errorContent:any[]=[];
  articleForm! :FormGroup;
  @ViewChild("submitButton") submitButton!:ElementRef;
  public Editor = DecoupledEditor;
  constructor(public myValidation: MayvalidationService, private authService: AuthService, private articleService:ArticleService ,private router: Router) { }

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      title:new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]),
      content:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(5000)])
    });
  }

  get getControls(){
    return this.articleForm.controls;
  }


  public onReady( editor:any ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}


  onSubmit(){
    this.loading = true;
    this.submitButton.nativeElement.disabled = true;
    this.articleService.addArticle(this.articleForm.value).subscribe(res => {
      this.router.navigateByUrl('/dashboard');
      alertify.success("Makaleniz başarıyla eklendi");
      this.errorTitle = [];
      this.errorContent = [];
      this.loading = false;
      this.submitButton.nativeElement.disabled = false;
    },err => {
      alertify.error("Bir hata oluştu!")
      this.loading = false;
      this.submitButton.nativeElement.disabled = false;
      this.errorTitle = err.error.errors.Title;
      this.errorContent = err.error.errors.Content;
    });

  }

}
