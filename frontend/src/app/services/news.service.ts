import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment


@Injectable({
  providedIn: 'root',
})
export class NewsService {
  // Use dynamic detection of environment
  private API_URL = this.isProduction()
    ? 'https://news-app-seilse.vercel.app/top-headlines'
    : `${environment.Backend_URI}/news/all`;

  constructor(private http: HttpClient) {}

  // Detect if the environment is production
  private isProduction(): boolean {
    return window.location.hostname !== 'localhost';
  }

  getNews(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
