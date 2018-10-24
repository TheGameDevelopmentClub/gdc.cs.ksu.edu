import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Game } from 'src/app/common/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  getAllGames(): Promise<Game[]> {
    return new Promise<Game[]>((resolve, reject) => {
      this.http.get<Game[]>(environment.API_URL + '/portfolio/games').subscribe(games => {
        resolve(games);
      }, error => reject(error));
    });
  }

  getNumberOfGames(amount: number): Promise<Game[]> {
    return new Promise<Game[]>((resolve, reject) => {
      this.getAllGames()
        .then(games => {
          const gameList = [];
          let randIndex;
          for (let i = 0; games.length > 0 && i < amount; i++) {
            randIndex = Math.floor(Math.random() * games.length);
            gameList.push(games[randIndex]);
            games.splice(randIndex, 1);
          }
          resolve(gameList);
        })
        .catch(err => reject(err));
    });
  }
}
