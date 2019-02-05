import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_common/services/storage/storage.service';
import { UtilityService } from 'src/app/_common/services/utility/utility.service';
import { AuthService } from 'src/app/_common/services/auth/auth.service';

@Component({
  selector: 'ksu-gdc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginResponseMessages') loginResponseMessages: InfoMessagesComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private utilityService: UtilityService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const snapshot = this.route.snapshot;
    const redirectUrl = snapshot.queryParams['r'];
    if (this.authService.isAuthenticated()) {
      this.checkRedirect(redirectUrl);
    } else {
      const token = this.storageService.getLocalStorageItem('ksu-gdc-user-token');
      if (token && token !== '') {
        this.authService.validateToken(token).then(() => {
          this.checkRedirect(redirectUrl);
        }).catch((error) => {
          this.loginResponseMessages.showError('There was a problem logging you in. Please try again.');
        });
      } else {
        const ticket = snapshot.queryParams['ticket'];
        if (ticket && ticket !== '') {
          this.utilityService.deleteQueryParams(['ticket']);
          this.authService.validate(ticket).then(() => {
            this.checkRedirect(redirectUrl);
          }).catch((error) => {
            this.loginResponseMessages.showError('There was a problem logging you in. Please try again.');
          });
        } else {
          this.authService.login();
        }
      }
    }
  }

  checkRedirect(redirectUrl: string) {
    if (redirectUrl) {
      this.router.navigate([redirectUrl]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
