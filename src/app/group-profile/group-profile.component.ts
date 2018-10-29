import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GroupService } from 'src/app/_common/services/group/group.service';
import { Group } from 'src/app/_common/models/group';
import { User } from 'src/app/_common/models/user';
import { Portfolio } from 'src/app/_common/models/portfolio';

@Component({
  selector: 'ksu-gdc-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.scss']
})
export class GroupProfileComponent implements OnInit {
  groupNotFound: boolean;
  group: Group;

  members: User[];
  portfolio: Portfolio = new Portfolio();

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    const groupId = this.route.snapshot.params['groupId'];
    this.groupService.getById(groupId)
      .then(group => {
        this.group = group;
        // this.groupService.getPaginationOfAll(groupId)
        //   .then(games => this.portfolio.games = games);
      })
      .catch(error => {
        this.group = null;
        this.groupNotFound = true;
      });
  }
}
