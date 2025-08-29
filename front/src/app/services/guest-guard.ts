import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.validateToken().pipe(
      map(res => {
        if (res.valid) {
          this.router.navigate(['/game'])
          return false
        }
        return true;
      }),
      catchError(() => of(true)) 
    );
  }
}
