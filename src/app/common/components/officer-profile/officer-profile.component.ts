import { Component, OnInit, Input } from '@angular/core';

import { OfficerService } from 'src/app/common/services/officer/officer.service';

@Component({
  selector: 'ksu-gdc-officer-profile',
  templateUrl: './officer-profile.component.html',
  styleUrls: ['./officer-profile.component.scss']
})
export class OfficerProfileComponent implements OnInit {
  position: string;
  officer;

  constructor(
    private officerService: OfficerService
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
}
