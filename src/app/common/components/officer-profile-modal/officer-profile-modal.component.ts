import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Officer } from 'src/app/common/models';

@Component({
  selector: 'ksu-gdc-officer-profile-modal',
  templateUrl: './officer-profile-modal.component.html',
  styleUrls: ['./officer-profile-modal.component.scss']
})
export class OfficerProfileModalComponent implements OnInit {
  officer: Officer;

  constructor(
    public dialogRef: MatDialogRef<OfficerProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData
  ) { }

  ngOnInit() {
    this.officer = this.dialogData.officer;
  }

}
