import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { StorageService } from 'src/app/_common/services/storage/storage.service';
import { UtilityService } from 'src/app/_common/services/utility/utility.service';
import { AuthService } from 'src/app/_common/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private utilityService: UtilityService,
    private authService: AuthService
  ) { }
  canActivate(snapshot: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const redirectUrl = snapshot.queryParams['r'] || this.storageService.getSessionStorageItem('ksu-gdc-login-redirect');
      if (this.authService.isAuthenticated()) {
        resolve(false);
        return this.checkRedirect(redirectUrl);
      }
      const ticket = snapshot.queryParams['ticket'];
      this.authService.validateCASTicket(ticket).then(() => {
        resolve(false);
        this.checkRedirect(redirectUrl);
      }).catch((error) => {
        const token = this.storageService.getLocalStorageItem('ksu-gdc-user-token');
        this.authService.validateToken(token).then(() => {
          resolve(false);
          this.checkRedirect(redirectUrl);
        }).catch((error2) => {
          resolve(true);
        });
      });
    });
  }

  checkRedirect(redirectUrl: string) {
    if (redirectUrl && redirectUrl !== '') {
      this.router.navigate([redirectUrl]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
