import { API_PATH } from '../constants/paths';
import { PortfolioItem } from 'src/app/_common/models/portfolio';

export class NewGame {
  public title: string;
  public description: string;
  public hostUrl: string;
  public userId: number;
}

export class Game extends PortfolioItem {
  public gameId: number;
  public description: string;
  public hostUrl: string;

  constructor(game: any) {
    super();
    this.gameId = game['gameId'];
    this.title = game['title'];
    this.description = game['description'];
    this.hostUrl = game['hostUrl'];
    this.imageUrl = `${API_PATH.games}/${this.gameId}/thumbnail-image`;
  }
}
