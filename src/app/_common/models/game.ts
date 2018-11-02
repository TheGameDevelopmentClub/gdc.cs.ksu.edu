import { API_PATH } from '../constants/paths';
import { PortfolioItem } from 'src/app/_common/models/portfolio';

export class Game extends PortfolioItem {
  public gameId: number;

  constructor(game: any) {
    super();
    this.gameId = game['gameId'];
    this.title = game['title'];
    this.description = game['description'];
    this.url = game['itemUrl'];
    this.user = game['user'];
    this.group = game['group'];
    this.imageUrl = `${API_PATH.gamesBaseUrl}/${this.gameId}/thumbnail-image`;
  }
}
