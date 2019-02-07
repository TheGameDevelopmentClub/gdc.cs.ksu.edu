import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StorageService } from '../storage/storage.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MiddlewareService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  validateToken(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const token = this.storageService.getLocalStorageItem('ksu-gdc-user-token');
      this.authService.validateToken(token).then(() => {
        resolve(true);
      }).catch((error) => {
        resolve(true);
      });
    });
  }
}
