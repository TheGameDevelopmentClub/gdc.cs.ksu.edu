import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ImageLoaderDirective } from 'src/app/common/directives/image-loader/image-loader.directive';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { UserService } from 'src/app/common/services/user/user.service';
import { PortfolioService } from 'src/app/common/services/portfolio/portfolio.service';
import { FileUploadComponent } from 'src/app/common/components/file-upload/file-upload.component';
import { InfoMessagesComponent } from 'src/app/common/components/info-messages/info-messages.component';
import { User } from 'src/app/common/models/user';
import { Group } from 'src/app/common/models/group';
import { Portfolio } from '../common/models/portfolio';

@Component({
  selector: 'ksu-gdc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('profileUpdateMessages') profileUpdateMessages: InfoMessagesComponent;
  @ViewChild('gamesUpdateMessages') gamesUpdateMessages: InfoMessagesComponent;
  @ViewChild('infoForm') infoForm: NgForm;
  @ViewChild(FileUploadComponent) profileImageUploader: FileUploadComponent;
  @ViewChild(ImageLoaderDirective) profileImage: ImageLoaderDirective;

  isValidated: boolean;
  user: User;

  groups: Group[];
  portfolio: Portfolio = new Portfolio();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private portfolioService: PortfolioService
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.params['userId'];
    this.userService.getUserById(userId)
      .then(user => {
        this.user = user;
        this.userService.getGames(userId)
          .then(games => this.portfolio.games = games);
        this.userService.getGroups(userId)
          .then(groups => this.groups = groups);
      })
      .catch(error => console.error(error));
  }
}
