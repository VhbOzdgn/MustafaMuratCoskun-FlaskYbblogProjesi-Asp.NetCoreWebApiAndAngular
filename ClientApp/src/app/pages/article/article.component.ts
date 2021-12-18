import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  id: number = Number(this.route.snapshot.paramMap.get('id'));
  article!: Article;
  loading: boolean = true;
  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getArticleById(this.id);
  }



  getArticleById(id: number) {
    this.articleService.getArticleById(id).subscribe(data => {
      this.article = data;
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err);
    });
  }


}
