import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { OfficerService } from 'src/app/common/services';
import { OfficerProfileModalComponent } from '../officer-profile-modal/officer-profile-modal.component';
import { Officer } from '../../models';

@Component({
  selector: 'ksu-gdc-officer-profile',
  templateUrl: './officer-profile.component.html',
  styleUrls: ['./officer-profile.component.scss']
})
export class OfficerProfileComponent implements OnInit {
  position: string;
  officer: Officer;

  constructor(
    private officerService: OfficerService,
    private dialog: MatDialog
  ) { }

  @Input('position') set setOfficerPosition(position: string) {
    this.position = position;
  }

  ngOnInit() {
    this.officerService.getOfficerByPosition(this.position)
      .then((officer) => {
        this.officer = officer;
      });
  }

  openOfficerModal() {
    this.dialog.open(OfficerProfileModalComponent, {
      width: '500px',
      data: {
        officer: this.officer
      }
    });
  }
}
