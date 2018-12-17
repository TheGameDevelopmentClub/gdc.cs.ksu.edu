import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { ActivatedRoute, Router } from '@angular/router';
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
    private authService: AuthService
  ) { }

  ngOnInit() {
    const redirectUrl = this.route.snapshot.queryParams['redirect'];
    const ticket = this.route.snapshot.queryParams['ticket'];
    if (ticket) {
      this.authService.validate(ticket).then(() => {
          if (redirectUrl) {
            this.router.navigate([redirectUrl]);
          } else {
            this.router.navigate(['/']);
          }
        }).catch((error) => this.loginResponseMessages.showError('There was a problem logging you in. Please try again.'));
    } else {
      this.authService.login();
    }
  }

}
