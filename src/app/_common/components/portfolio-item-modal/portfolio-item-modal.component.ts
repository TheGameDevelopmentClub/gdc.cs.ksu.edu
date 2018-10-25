import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Game } from 'src/app/_common/models/game';

@Component({
  selector: 'ksu-gdc-portfolio-item-modal',
  templateUrl: './portfolio-item-modal.component.html',
  styleUrls: ['./portfolio-item-modal.component.scss']
})
export class PortfolioItemModalComponent implements OnInit {
  item: Game;

  constructor(
    public dialogRef: MatDialogRef<PortfolioItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData
  ) { }

  ngOnInit() {
    this.item = this.dialogData.item;
  }

  closeModal() {
    this.dialogRef.close();
  }
}
