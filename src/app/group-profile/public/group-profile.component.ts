import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GroupService } from 'src/app/_common/services/group/group.service';
import { UserService } from 'src/app/_common/services/user/user.service';
import { GameService } from 'src/app/_common/services/game/game.service';
import { Group } from 'src/app/_common/models/group';

@Component({
  selector: 'ksu-gdc-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['../group-profile.component.scss']
})
export class GroupProfileComponent implements OnInit {
  categories = {
    users: {
      service: this.userService,
      loading: false,
      loaded: false,
      pageSize: 6,
      totalItemCount: 0,
      list: []
    },
    games: {
      service: this.gameService,
      loading: false,
      loaded: false,
      pageSize: 6,
      totalItemCount: 0,
      list: []
    }
  };

  groupNotFound: boolean;
  group: Group;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private userService: UserService,
    private gameService: GameService
  ) { }

  ngOnInit() {
    const groupId = this.route.snapshot.params['groupId'];
    this.groupService.getById(groupId)
      .then(group => {
        this.group = group;
        this.loadPage('users', 1);
        this.loadPage('games', 1);
      })
      .catch(error => {
        this.group = null;
        this.groupNotFound = true;
      });
  }

  loadPage(category: string, pageNumber: number) {
    this.categories[category].loading = true;
    this.categories[category].service.getPaginationOfAllByGroupId(this.group.groupId, pageNumber, this.categories[category].pageSize)
      .then((items) => {
        this.categories[category].list = items.value;
        this.categories[category].totalItemCount = items.total;
        this.categories[category].loaded = true;
        this.categories[category].loading = false;
      });
  }
}
