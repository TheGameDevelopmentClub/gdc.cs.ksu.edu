import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_common/services/storage/storage.service';
import { AuthService } from 'src/app/_common/services/auth/auth.service';
import { STORAGE_KEY_NAMES } from '../_common/constants/storage';
import { QUERY_PARAM_KEY_NAMES, APP_ROUTES } from '../_common/constants/routing';
import { ModalService } from '../_common/services/modal/modal.service';

@Component({
  selector: 'ksu-gdc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(InfoMessagesComponent) loginResponseMessages: InfoMessagesComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private authService: AuthService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    const snapshot = this.route.snapshot;
    const ticket = snapshot.queryParams.ticket;
    if (ticket) {
      this.authService.validateCASTicket(ticket).then(() => {
        const redirectUrl = snapshot.queryParams[QUERY_PARAM_KEY_NAMES.redirectUrl]
          || this.storageService.getSessionStorageItem(STORAGE_KEY_NAMES.redirectUrl);
        this.storageService.removeSessionStorageItem(STORAGE_KEY_NAMES.redirectUrl);
        this.modalService.verifyUserInfo();
        this.checkRedirect(redirectUrl);
      }).catch((error) => {
        this.loginResponseMessages.showError('Login via Kansas State University was unsuccessful.');
      });
    } else {
      const redirectUrl = this.route.snapshot.queryParams[QUERY_PARAM_KEY_NAMES.redirectUrl];
      if (redirectUrl) {
        this.storageService.setSessionStorageItem(STORAGE_KEY_NAMES.redirectUrl, redirectUrl);
      }
      this.authService.loginCAS();
    }
  }

  private checkRedirect(redirectUrl: string): void {
    if (redirectUrl && redirectUrl !== '') {
      this.router.navigate([redirectUrl]);
    } else {
      this.router.navigate([APP_ROUTES.home]);
    }
  }
}
