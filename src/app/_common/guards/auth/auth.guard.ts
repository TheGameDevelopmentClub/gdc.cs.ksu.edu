import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from 'src/app/_common/services/auth/auth.service';
import { APP_ROUTES, QUERY_PARAM_KEY_NAMES } from 'src/app/_common/constants/routing';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      const queryParams = {};
      queryParams[QUERY_PARAM_KEY_NAMES.redirectUrl] = state.url;
      this.router.navigate([APP_ROUTES.login], {
        queryParams
      });
      return false;
    }
  }
}
