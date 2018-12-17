import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from 'src/app/_common/services/auth/auth.service';
import { APP_PATH } from 'src/app/_common/constants/paths';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authUser = this.authService.authenticatedUser;
    if (authUser) {
      return true;
    } else {
      this.router.navigate([APP_PATH.login], {
        queryParams: {
          redirect: state.url
        }
      });
      return false;
    }
  }
}
