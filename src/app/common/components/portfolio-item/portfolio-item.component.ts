import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Game } from 'src/app/common/models';
import { PortfolioItemModalComponent } from 'src/app/common/components/portfolio-item-modal/portfolio-item-modal.component';

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
    if (window.innerWidth < 992) {
      window.open(this.item.url, '_blank');
    } else {
      this.dialog.open(PortfolioItemModalComponent, {
        data: {
          item: this.item
        }
      });
    }
  }
}
