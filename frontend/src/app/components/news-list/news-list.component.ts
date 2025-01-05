import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  articles: any[] = [];
  isLoading: boolean = false;  // Add loading flag to track API call status

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews() {
    this.isLoading = true;  // Set loading to true before the API call
    this.newsService.getNews().subscribe(
      (data) => {
        this.articles = data.articles;
        this.isLoading = false;  
      },
      (error) => {
        console.error('Error fetching news:', error);
        this.isLoading = false;  
      }
    );
  }
}
