import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ksu-gdc-group-profile-container',
  templateUrl: './group-profile-container.component.html',
  styleUrls: ['./group-profile.component.scss']
})
export class GroupProfileContainerComponent implements OnInit {
  groupId: number;
  editing: boolean;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.groupId = Number(this.route.snapshot.params['groupId']);
  }
}
