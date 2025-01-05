import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';  // Import UserService

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private userService: UserService  // Inject UserService
  ) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      // Handle password mismatch
      alert("Passwords do not match!");
      return;
    }

    // Call signup method from UserService
    this.userService.signup(this.name, this.email, this.password).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // Redirect to login page on successful registration
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration error', error);
        alert('Registration failed. Please try again.');
      }
    );
  }
}
