import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/common/services/auth/auth.service';
import { UserService } from 'src/app/common/services/user/user.service';
import { User } from 'src/app/common/models/user';

@Component({
  selector: 'ksu-gdc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  error: boolean;
  errorMessage: string;

  isValidated: boolean;
  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authService.validateCASTicket(this.router.url, this.route.snapshot.queryParams['ticket'])
      .then(user => {
        this.user = user;
        this.isValidated = true;
      })
      .catch(error => {
        this.authService.loginWithCAS(this.router.url);
      });
  }

  showError(message: string): void {
    this.errorMessage = message;
    this.error = true;
  }

  hideError(): void {
    this.error = false;
  }

  log(event) {
    console.log(event);
  }

  updateUser(): void {
    this.userService.updateUser(this.user)
      .then(() => {
        this.hideError();
      })
      .catch(error => this.showError('There was a problem updating your settings. Please try again later.'));
  }
}
