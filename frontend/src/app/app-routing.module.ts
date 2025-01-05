import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { SearchComponent } from './components/search/search.component'; // Import the SearchComponent
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: NewsListComponent }, 
  { path: 'article/:id', component: ArticleDetailComponent }, 
  { path: 'search', component: SearchComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-news', component: AddNewsComponent, canActivate: [AuthGuard]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
