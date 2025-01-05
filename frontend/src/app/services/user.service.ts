import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Import environment

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  signup(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post<any>(`${environment.Backend_URI}/user/signup`, body);
  }
  
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${environment.Backend_URI}/user/login`, body);  // Adjust this URL as per your backend API
  }


}
