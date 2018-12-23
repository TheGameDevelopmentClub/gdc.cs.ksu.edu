import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/_common/models/user';

@Component({
  selector: 'ksu-gdc-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss']
})
export class MemberItemComponent implements OnInit {
  @Input() user: User;
  @Input() showX = false;
  @Output() clickedX: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  openUserInfo() {
    this.router.navigate([`/members/${this.user.userId}`]);
  }

  X() {
    this.clickedX.emit(this.user);
  }
}
