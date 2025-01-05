// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserService } from '../services/user.service';  

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';
//   loading = false;

//   constructor(
//     private router: Router,
//     private userService: UserService 
//   ) {}

//   onSubmit() {
//     if (!this.email || !this.password) {
//       alert('Please enter both email and password!');
//       return;
//     }

//     this.loading = true;

    
//     this.userService.login(this.email, this.password).subscribe(
//       (response) => {
//         console.log('Login successful', response);

//         if (response.token) {
//           localStorage.setItem('token', response.token); 
          
//         } else {
//           alert('Token not received!');
//         }

//         this.loading = false;

//         // Redirect to the home page or user dashboard
//         this.router.navigate(['/']);
//       },
//       (error) => {
//         console.error('Login error', error);
//         this.loading = false;
//         alert('Login failed. Please check your credentials and try again.');
//       }
//     );
//   }
// }







import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading = false;

  constructor(private router: Router, private userService: UserService) {}

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password!');
      return;
    }

    this.loading = true;

    this.userService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);

        if (response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        } else {
          alert('Token not received!');
        }

        this.loading = false;
        this.router.navigate(['/']); // Redirect after login
        window.location.href = '/';
      },
      (error) => {
        console.error('Login error', error);
        this.loading = false;
        alert('Login failed. Please check your credentials and try again.');
      }
    );
  }
}
