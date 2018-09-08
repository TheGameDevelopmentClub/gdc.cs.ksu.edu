import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { PortfolioItemModalComponent } from 'src/app/common/components/portfolio-item-modal/portfolio-item-modal.component';
import { Game } from 'src/app/common/models/game';

@Component({
  selector: 'ksu-gdc-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {
  item: Game;

  constructor(
    private dialog: MatDialog
  ) { }

  @Input('game') set setPortfolioItem(game: Game) {
    this.item = game;
  }

  ngOnInit() {
  }

  openItemInfoModal() {
    if (window.innerWidth < 992 || window.innerHeight < 350) {
      window.open(this.item.url, '_blank');
    } else {
      this.dialog.open(PortfolioItemModalComponent, {
        width: '70%',
        height: '55%',
        data: {
          item: this.item
        },
        autoFocus: false
      });
    }
  }
}
