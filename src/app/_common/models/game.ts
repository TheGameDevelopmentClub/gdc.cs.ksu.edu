import { API_URLS } from 'src/app/_common/constants/routing';
import { PortfolioItem, NewPortfolioItem } from 'src/app/_common/models/portfolio';

export class NewGame extends NewPortfolioItem {
  public title: string;
  public description: string;
  public hostUrl: string;

  constructor() {
    super();
  }
}

export class Game extends PortfolioItem {
  public gameId: number;
  public description: string;
  public hostUrl: string;

  constructor(game: any) {
    super();
    this.category = 'games';
    this.gameId = Number(game['gameId']);
    this.title = game['title'];
    this.description = game['description'];
    this.hostUrl = game['hostUrl'];
    this.imageUrl = `${API_URLS.games}/${this.gameId}/thumbnail-image`;
  }

  get id(): number {
    return this.gameId;
  }
}
