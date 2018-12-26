import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from 'src/app/_common/services/game/game.service';
import { PortfolioItem } from '../_common/models/portfolio';

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
      pageSize: 6,
      totalItemCount: 0,
      list: []
    }
  };

  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.loadPage('games', 1);
  }

  loadPage(category: string, pageNumber: number) {
    this.categories[category].loading = true;
    this.categories[category].service.get(pageNumber, this.categories[category].pageSize)
      .then((items) => {
        this.categories[category].list = items.value;
        this.categories[category].totalItemCount = items.total;
        this.categories[category].loaded = true;
        this.categories[category].loading = false;
      });
  }

  navigateToPortfolioItemPage(item: PortfolioItem): void {
    item.navigateToProfilePage(this.router);
  }
}
