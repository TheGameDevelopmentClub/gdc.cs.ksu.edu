import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { OfficerService } from 'src/app/common/services';
import { Officer } from 'src/app/common/models';
import { OfficerProfileModalComponent } from 'src/app/common/components/officer-profile-modal/officer-profile-modal.component';

@Component({
  selector: 'ksu-gdc-officer-profile',
  templateUrl: './officer-profile.component.html',
  styleUrls: ['./officer-profile.component.scss']
})
export class OfficerProfileComponent implements OnInit {
  position: string;
  officer: Officer;

  constructor(
    private dialog: MatDialog,
    private officerService: OfficerService
  ) { }

  @Input('officer') set setOfficer(officer: Officer) {
    this.officer = officer;
  }

  ngOnInit() {
  }

  getPosition(): string {
    if (this.officer) {
      return this.officer.position;
    } else {
      return '';
    }
  }

  getFullName(): string {
    if (this.officer && this.officer.user) {
      return this.officer.user.firstName + ' ' + this.officer.user.lastName;
    } else {
      return '';
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
