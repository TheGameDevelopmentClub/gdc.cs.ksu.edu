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

  openOfficerInfoModal() {
    this.dialog.open(OfficerProfileModalComponent, {
      width: '500px',
      data: {
        officer: this.officer
      }
    });
  }
}
