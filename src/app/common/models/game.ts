import { environment } from 'src/environments/environment';

export class Game {
  public gameId: number;
  public title: string;
  public description: string;
  public imageUrl: string;
  public itemUrl: string;

  constructor(game: any) {
    this.gameId = game['gameId'];
    this.title = game['title'];
    this.description = game['description'];
    this.imageUrl = game['imageUrl'] || `${environment.API_URL}/games/${this.gameId}/thumbnail-image`;
    this.itemUrl = game['itemUrl'];
  }
}
