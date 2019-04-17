import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StorageService } from '../storage/storage.service';
import { AuthService } from '../auth/auth.service';
import { STORAGE_KEY_NAMES } from '../../constants/storage';
import { ModalService } from '../modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class MiddlewareService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private modalService: ModalService
  ) { }

  validateToken(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const token = this.storageService.getSessionStorageItem(STORAGE_KEY_NAMES.userAuthToken);
      this.authService.validateToken(token).then(() => {
        this.modalService.verifyUserInfo().then(() => {
          resolve(true);
        });
      }).catch((error) => {
        resolve(true);
      });
    });
  }
}
