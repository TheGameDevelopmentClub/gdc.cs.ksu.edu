import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { StorageService } from 'src/app/_common/services/storage/storage.service';
import { AuthService } from 'src/app/_common/services/auth/auth.service';
import { QUERY_PARAM_KEY_NAMES } from '../../constants/routing';
import { STORAGE_KEY_NAMES } from '../../constants/storage';
import { ModalService } from '../../services/modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private modalService: ModalService
  ) { }
  canActivate(snapshot: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const redirectUrl = snapshot.queryParams[QUERY_PARAM_KEY_NAMES.redirectUrl]
        || this.storageService.getSessionStorageItem(STORAGE_KEY_NAMES.redirectUrl);
      this.storageService.removeSessionStorageItem(STORAGE_KEY_NAMES.redirectUrl);
      if (this.authService.isAuthenticated()) {
        resolve(false);
        return this.checkRedirect(redirectUrl);
      }
      const token = this.authService.getUserAccessToken();
      this.authService.validateToken(token).then(() => {
        this.modalService.verifyUserInfo();
        resolve(false);
        this.checkRedirect(redirectUrl);
      }).catch((error) => {
        resolve(true);
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
