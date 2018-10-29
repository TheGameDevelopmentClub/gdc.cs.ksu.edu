import { Component, OnInit } from '@angular/core';

import { GameService } from 'src/app/_common/services/game/game.service';

@Component({
  selector: 'ksu-gdc-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  categories = {
    games: {
      service: this.gameService,
      loading: false,
      loaded: false,
      pageSize: 3,
      totalItemCount: 0,
      list: []
    }
  };

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.loadPage('games', 1);
  }

  loadPage(category: string, pageNumber: number) {
    this.categories[category].loading = true;
    this.categories[category].service.getPaginationOfAll(pageNumber, this.categories[category].pageSize)
      .then((items) => {
        this.categories[category].list = items.value;
        this.categories[category].totalItemCount = items.originalCount;
        this.categories[category].loaded = true;
        this.categories[category].loading = false;
      });
  }
}
