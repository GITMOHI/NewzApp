import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-news-app';
  searchKeyword: string = ''; // Stores the search keyword entered by the user

  constructor(private router: Router) {}

  // Method triggered when the search form is submitted
  onSearch(keyword: string): void {
    if (keyword.trim()) { // Ensure the search keyword is not empty or whitespace
      this.router.navigate(['/search'], { queryParams: { q: keyword.trim() } });
    }
  }





  isDropdownOpen = false;
  // isLoggedIn = false; // Replace with actual login state check
  // username = 'John Doe'; // Replace with actual username from user data

  isLoggedIn = false;
  username: string = '';
  isAdmin = false;



  ngOnInit() {
    this.checkLoginState();
  }

  checkLoginState() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

    if (token && user) {
      this.isLoggedIn = true;
      this.username = user.name;
      this.isAdmin = user.role === 'admin';
    } else {
      this.isLoggedIn = false;
      this.username = '';
      this.isAdmin = false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.username = '';
    this.isAdmin = false;
    // this.router.navigate(['/login']); // Redirect to login after logout
    window.location.href = '/';

  }

  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  handleLogin() {
    // You can perform any additional logic here before redirecting
    console.log('Navigating to login page');
  }

  handleRegister() {
    // You can perform any additional logic here before redirecting
    console.log('Navigating to register page');
  }



}
