import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AboutComponent } from './pages/about/about.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { ArticleComponent } from './pages/article/article.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { UpdateArticleComponent } from './pages/update-article/update-article.component';

const routes: Routes = [
  {path:"",component:MainLayoutComponent, children:[
    {path:"",component:HomeComponent},
    {path:"home",component:HomeComponent},
    {path:"about",component:AboutComponent},
    {path:"register",component:RegisterComponent},
    {path:"login",component:LoginComponent},
    {path:"articles",component:ArticlesComponent},
    {path:"article/:id",component:ArticleComponent},
    {path:"edit/:id",component:UpdateArticleComponent,canActivate:[AuthGuard]},
    {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
    {path:"add-article",component:AddArticleComponent,canActivate:[AuthGuard]},
    {path:"**",component:NotFoundComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
