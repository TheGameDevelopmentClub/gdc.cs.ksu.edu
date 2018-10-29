import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from 'src/app/_common/services/user/user.service';
import { User } from 'src/app/_common/models/user';
import { Group } from 'src/app/_common/models/group';
import { Portfolio } from 'src/app/_common/models/portfolio';

@Component({
  selector: 'ksu-gdc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userNotFound: boolean;
  user: User;

  groups: Group[];
  portfolio: Portfolio = new Portfolio();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.params['userId'];
    this.userService.getById(userId)
      .then(user => {
        this.user = user;
        this.userService.getGames(userId)
          .then(games => this.portfolio.games = games);
        this.userService.getGroups(userId)
          .then(groups => this.groups = groups);
      })
      .catch(error => {
        this.user = null;
        this.userNotFound = true;
      });
  }
}
