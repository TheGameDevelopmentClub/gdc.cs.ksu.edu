import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Game } from 'src/app/common/models';

@Component({
  selector: 'ksu-gdc-portfolio-item-modal',
  templateUrl: './portfolio-item-modal.component.html',
  styleUrls: ['./portfolio-item-modal.component.scss']
})
export class PortfolioItemModalComponent implements OnInit {
  game: Game;

  constructor(
    public dialogRef: MatDialogRef<PortfolioItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData
  ) { }

  ngOnInit() {
    this.game = this.dialogData.game;
  }

}
