import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'src/app/_common/models/user';

@Component({
  selector: 'ksu-gdc-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss']
})
export class MemberItemComponent implements OnInit {
  @Input() user: User;
  @Input() showX = false;
  @Output() clicked: EventEmitter<User> = new EventEmitter<User>();
  @Output() clickedX: EventEmitter<User> = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
  }

  handleClick(): void {
    this.clicked.emit(this.user);
  }

  X(): void {
    this.clickedX.emit(this.user);
  }
}
