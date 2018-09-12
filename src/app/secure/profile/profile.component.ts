import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/common/services/auth/auth.service';
import { UserService } from 'src/app/common/services/user/user.service';
import { InfoMessagesComponent } from 'src/app/common/components/info-messages/info-messages.component';
import { User } from 'src/app/common/models/user';

@Component({
  selector: 'ksu-gdc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild(InfoMessagesComponent) infoMessages: InfoMessagesComponent;

  isValidated: boolean;
  user: User;
  profileImage: File;

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

  uploadProfileImage(image: File) {
    this.userService.updateProfileImage(this.user.id, image)
      .then(() => this.infoMessages.showSuccess('Your profile image has been updated.'))
      .catch(error => this.infoMessages.showError('There was a problem updating your profile picture.'));
  }

  updateUserInfo(): void {
    this.userService.updateUser(this.user)
      .then(() => this.infoMessages.showSuccess('Your info has been updated.'))
      .catch(error => this.infoMessages.showError('There was a problem updating your info.'));
  }
}
