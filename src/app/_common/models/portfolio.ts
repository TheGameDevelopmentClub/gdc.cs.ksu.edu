import { Game } from 'src/app/_common/models/game';

export class Portfolio {
  public games: Game[];

  constructor() {
    this.games = [];
  }
}

export class PortfolioItem {
  public title: string;
  public description: string;
  public imageUrl: string;
  public itemUrl: string;
}
