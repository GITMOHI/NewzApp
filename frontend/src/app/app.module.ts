import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddNewsComponent } from './components/add-news/add-news.component'; // Import FormsModule


@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    ArticleDetailComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    AddNewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
