import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

    if (user && user.role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
