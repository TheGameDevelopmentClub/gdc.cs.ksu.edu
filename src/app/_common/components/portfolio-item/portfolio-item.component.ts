import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Game } from 'src/app/_common/models/game';

@Component({
  selector: 'ksu-gdc-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {
  item: Game;

  constructor(
    private router: Router
  ) { }

  @Input('item') set setPortfolioItem(item: Game) {
    this.item = item;
  }

  ngOnInit() {
  }

  openItemInfo() {
    this.router.navigate(['/portfolio/games/' + this.item.gameId]);
  }
}
