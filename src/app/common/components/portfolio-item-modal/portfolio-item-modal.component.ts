import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PortfolioItem } from 'src/app/common/models';

@Component({
  selector: 'ksu-gdc-portfolio-item-modal',
  templateUrl: './portfolio-item-modal.component.html',
  styleUrls: ['./portfolio-item-modal.component.scss']
})
export class PortfolioItemModalComponent implements OnInit {
  item: PortfolioItem;

  constructor(
    public dialogRef: MatDialogRef<PortfolioItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData
  ) { }

  ngOnInit() {
    this.item = this.dialogData.item;
  }

}
