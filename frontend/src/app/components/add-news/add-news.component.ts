import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent {
  sourceName: string = '';
  title: string = '';
  description: string = '';
  content: string = '';
  url: string = '';
  image: File | null = null;
  loading = false; // To handle the spinner
  notification: { message: string, type: string } | null = null; // For notifications

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.image = event.target.files[0];
  }

  addNews() {
    if (!this.title || !this.sourceName || !this.content || !this.url || !this.image ) {
      this.showNotification('Please fill all the fields!', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('sourceName', this.sourceName);
    formData.append('content', this.content);
    formData.append('url', this.url);
    formData.append('urlToImage', this.image);

    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');

    // Set up the Authorization header with Bearer token if available
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token ? `Bearer ${token}` : ''
      }),
      withCredentials: true // Ensure cookies (if any) are sent along with the request
    };

    this.loading = true; // Show spinner while loading
    this.http.post(`${environment.Backend_URI}/news/addNews`, formData, httpOptions).subscribe(
      (response) => {
        this.loading = false;
        this.showNotification('News added successfully!', 'success');
        console.log(response);
      },
      (error) => {
        this.loading = false;
        this.showNotification('Failed to add news. Please try again.', 'error');
        console.error(error);
      }
    );
  }

  showNotification(message: string, type: string) {
    this.notification = { message, type };
    setTimeout(() => {
      this.notification = null; // Hide notification after 4 seconds
    }, 4000);
  }
}
