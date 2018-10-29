import { environment } from 'src/environments/environment';
import { PortfolioItem } from 'src/app/_common/models/portfolio';

export class Game extends PortfolioItem {
  public gameId: number;

  constructor(game: any) {
    super();
    this.gameId = game['gameId'];
    this.title = game['title'];
    this.description = game['description'];
    this.imageUrl = game['imageUrl'] || `${environment.API_URL}/portfolio/games/${this.gameId}/thumbnail-image`;
    this.itemUrl = game['itemUrl'];
  }
}
