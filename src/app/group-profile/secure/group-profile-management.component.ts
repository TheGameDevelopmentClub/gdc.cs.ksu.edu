import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GroupService } from 'src/app/_common/services/group/group.service';
import { Group } from 'src/app/_common/models/group';

@Component({
  selector: 'ksu-gdc-group-profile-management',
  templateUrl: './group-profile-management.component.html',
  styleUrls: ['../group-profile.component.scss']
})
export class GroupProfileManagementComponent implements OnInit {
  @Input() groupId: number;
  @Output() doneEditing: EventEmitter<void> = new EventEmitter<void>();

  errorOccurred: boolean;
  group: Group;

  constructor(
    private groupService: GroupService
  ) { }

  ngOnInit() {
  }

  stopEditing() {
    this.doneEditing.emit();
  }
}
