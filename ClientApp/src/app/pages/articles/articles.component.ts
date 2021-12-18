import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

declare let alertify: any;

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  loading: boolean = true;
  searchText: string = '';
  searchStatus:boolean = false;
  constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(paramMap => {
      this.searchText = paramMap.get('title') ?? '';
      if (this.searchText === '') {
        this.searchStatus = false;
        this.getArticles();
      } else {
        this.searchStatus = true;
        this.search();
      }
    });
  }


  searchUrl(){
    this.router.navigate(['/articles'], { queryParams: { title: this.searchText } });
  }

  search() {
    this.articleService.getArticlesBySearchText(this.searchText).subscribe(data => {
      this.articles = data;
      this.loading = false;
      alertify.message(`${this.articles.length} adet sonuç bulundu`);
    }, error => {
      alertify.error("Bir hata oluştu!");
      this.loading = false;
      this.searchText = '';
    });
  }

  getArticles() {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
      this.loading = false;
      this.searchText = '';
    });
  }

}
