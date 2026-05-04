import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('cw_token');
    if (token) return true;

    this.router.navigate(['/auth/signin/basic'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
