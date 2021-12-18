import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth-guard';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ArticlesComponent } from './pages/articles/articles.component';
import { JwtModule } from "@auth0/angular-jwt";
import { LoadingComponent } from './components/loading/loading.component';
import { ArticleComponent } from './pages/article/article.component';
import { UpdateArticleComponent } from './pages/update-article/update-article.component';

export function tokenGetter() {
  return localStorage.getItem("YbBlogToken");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MainLayoutComponent,
    NavbarComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AddArticleComponent,
    ArticlesComponent,
    LoadingComponent,
    ArticleComponent,
    UpdateArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44314"],
        disallowedRoutes: ["https://localhost:44314/api/auth/"],
      },
    }),
    CKEditorModule

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
