import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/article';



@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  private apiUrl: string = "https://localhost:44314/api/articles";
  constructor(private httpClient: HttpClient) { }

  addArticle(article: Article) {
    return this.httpClient.post<Article>(this.apiUrl, article);
  }

  getArticles() {
    return this.httpClient.get<Article[]>(this.apiUrl);
  }

  getArticlesByUserId() {
    return this.httpClient.get<Article[]>(`${this.apiUrl}/myarticles`);
  }

  getArticleById(id: number) {
    return this.httpClient.get<Article>(`${this.apiUrl}/${id}`);
  }

  deleteArticle(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

  updateArticle(id:number, article: Article) {
    return this.httpClient.put<Article>(`${this.apiUrl}/${id}`, article);
  }

  getArticlesBySearchText(searchText:string){
    return this.httpClient.get<Article[]>(`${this.apiUrl}/getarticlesbysearchtext/${searchText}`);
  }
}
