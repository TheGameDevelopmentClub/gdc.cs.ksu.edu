import { Component, OnInit } from '@angular/core';

import { PortfolioService } from 'src/app/common/services/portfolio/portfolio.service';
import { Game } from 'src/app/common/models/game';

@Component({
  selector: 'ksu-gdc-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games: Game[];

  constructor(
    private portfolioService: PortfolioService
  ) { }

  ngOnInit() {
    this.portfolioService.getAllGames()
      .then((games) => this.games = games);
  }

}
