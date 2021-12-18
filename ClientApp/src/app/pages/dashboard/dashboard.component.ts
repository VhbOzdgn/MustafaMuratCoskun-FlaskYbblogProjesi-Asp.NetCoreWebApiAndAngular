import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';

declare let alertify:any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string = '';
  articles: Article[] = [];
  selectedArticle: Article | undefined;
  loading: boolean = true;
  @ViewChild('modalCloseButton') modalCloseButton!: ElementRef;
  constructor(private authService: AuthService, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.username = this.authService.helper.decodeToken(localStorage.getItem("YbBlogToken") || undefined).unique_name;
    this.getArticlesByUserId();
  }


  getArticlesByUserId() {
    this.articleService.getArticlesByUserId().subscribe(data => {
      this.articles = data;
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
    });
  }

  cancel() {
    this.selectedArticle = undefined;
  }

  deleteArticle(article: Article) {
    this.articleService.deleteArticle(article.id).subscribe(res => {
      this.articles.splice(this.articles.indexOf(article), 1);
      this.selectedArticle = undefined;
      alertify.message('Makaleniz başarıyla silinmiştir.');
    }, error => {
      alertify.error('Bir hata oluştu!')
      this.selectedArticle = undefined;
    });

    this.modalCloseButton.nativeElement.click();

  }
  selectArticle(article: Article) {
    this.selectedArticle = article;
  }


}
