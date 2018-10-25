import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { OfficerProfileModalComponent } from 'src/app/_common/components/officer-profile-modal/officer-profile-modal.component';
import { OfficerService } from 'src/app/_common/services/officer/officer.service';
import { Officer } from 'src/app/_common/models/officer';

@Component({
  selector: 'ksu-gdc-officer-profile',
  templateUrl: './officer-profile.component.html',
  styleUrls: ['./officer-profile.component.scss']
})
export class OfficerProfileComponent implements OnInit {
  position: string;
  officer: Officer;

  constructor(
  ) { }

  @Input('position') set setPosition(position: string) {
    this.position = position;
  }
  @Input('officer') set setOfficer(officer: Officer) {
    this.officer = officer;
  }

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

  openOfficerInfoModal(): void {
    // this.dialog.open(OfficerProfileModalComponent, {
    //   width: '60%',
    //   height: '50%',
    //   data: {
    //     officer: this.officer
    //   },
    //   autoFocus: false
    // });
  }
}
