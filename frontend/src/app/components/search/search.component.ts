import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; // Import environment

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchKeyword: string = '';
  articles: any[] = [];
  validArticles: any[] = [];
  apiUrl: string = '';
  loading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchKeyword = params['q'];
      if (this.searchKeyword) {
        this.setApiUrl();
        this.fetchNews();
      }
    });
  }

  private setApiUrl(): void {
    const isProduction = window.location.hostname !== 'localhost';
    this.apiUrl =`${environment.Backend_URI}/news/search?query=${this.searchKeyword}`;
  }

  fetchNews(): void {
    this.loading = true;
    this.http.get(this.apiUrl).subscribe((response: any) => {
      this.articles = response.articles;
      this.validArticles = this.articles.filter(article => article.urlToImage);
      this.totalItems = this.validArticles.length;
      this.loading = false;
    }, error => {
      console.error('Error fetching news:', error);
      this.loading = false;
    });
  }

  get currentPageArticles(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.validArticles.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
