import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { StorageService } from 'src/app/_common/services/storage/storage.service';
import { AuthService } from 'src/app/_common/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      const token = this.storageService.getLocalStorageItem('ksu-gdc-user-token');
      if (token && token !== '') {
        this.authService.validateToken(token);
      }
    }
    return true;
  }
}
