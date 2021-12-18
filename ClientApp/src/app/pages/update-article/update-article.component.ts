import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { MayvalidationService } from 'src/app/services/mayvalidation.service';
import { AuthService } from 'src/app/services/auth.service';
import { Article } from 'src/app/models/article';


declare let alertify: any;


@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {
  id!: number;
  loading: boolean = false;
  articleForm!: FormGroup;
  notFound:boolean = false;
  @ViewChild("submitButton") submitButton!: ElementRef;
  public Editor = DecoupledEditor;
  constructor(public myValidation: MayvalidationService,
    private authService: AuthService,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticleById(this.id).subscribe(data => {
      this.notFound = false;
      if (data.author == this.authService.helper.decodeToken(localStorage.getItem("YbBlogToken") || undefined).unique_name) {
        this.getControls.title.setValue(data.title);
        this.getControls.content.setValue(data.content);
        this.getControls.id.setValue(data.id);
      } else {
        alertify.error("Yetkisiz erişim!");
        this.router.navigateByUrl('/dashboard');
      }
    },error => {
      if(error.status == 404){
        this.notFound = true;
      }
      alertify.error("Bir hata oluştu!");
    });


    this.articleForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      content: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)])
    });
  }

  get getControls() {
    return this.articleForm.controls;
  }


  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }


  onSubmit() {
    this.loading = true;
    this.submitButton.nativeElement.disabled = true;

    this.articleService.updateArticle(this.id, this.articleForm.value).subscribe(res => {
      this.router.navigateByUrl('/dashboard');
      alertify.success("Makaleniz başarıyla güncellendi");
      this.loading = false;
      this.submitButton.nativeElement.disabled = false;
    }, err => {
      alertify.error("Bir hata oluştu!");
      this.loading = false;
      this.submitButton.nativeElement.disabled = false;
      console.log(err);
    });

  }

}
