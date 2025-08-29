import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.auth.validateToken().pipe(
      map(res => {
        if (res.valid) {
          return true
        }
        this.router.navigate(['/login'])
        return false
      }),
      catchError(() => of(this.router.createUrlTree(['/login'])))
    )
  }
  
}
