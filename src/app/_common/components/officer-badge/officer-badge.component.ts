import { Component, OnInit, Input } from '@angular/core';

import { Officer } from 'src/app/_common/models/officer';

@Component({
  selector: 'ksu-gdc-officer-badge',
  templateUrl: './officer-badge.component.html',
  styleUrls: ['./officer-badge.component.scss']
})
export class OfficerBadgeComponent implements OnInit {
  @Input() position: string;
  @Input() officer: Officer;

  constructor(
  ) { }

  ngOnInit() {
  }

  getPosition(): string {
    if (this.officer) {
      return this.officer.position;
    } else {
      return this.position;
    }
  }

  getFullName(): string {
    if (this.officer && this.officer.user) {
      return this.officer.user.firstName + ' ' + this.officer.user.lastName;
    } else {
      return '[Unassigned]';
    }
  }

  getImageUrl(): string {
    if (this.officer && this.officer.user) {
      return this.officer.user.imageUrl;
    }
  }
}
