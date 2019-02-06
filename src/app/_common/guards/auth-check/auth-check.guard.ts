import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { MiddlewareService } from 'src/app/_common/services/middleware/middleware.service';
import { AuthService } from 'src/app/_common/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthCheckGuard implements CanActivate {
  constructor(
    private middlewareService: MiddlewareService,
    private authService: AuthService
  ) { }
  canActivate(): boolean | Promise<boolean> {
    if (!this.authService.isAuthenticated()) {
      return this.middlewareService.validateToken();
    }
    return true;
  }
}
