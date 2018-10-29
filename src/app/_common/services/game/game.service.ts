import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { PaginatedList } from 'src/app/_common/models/paginated-list';
import { Game } from 'src/app/_common/models/game';

const baseUrl = environment.API_URL + '/portfolio/games';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Promise<Game[]> {
    return new Promise<Game[]>((resolve, reject) => {
      this.http.get<Game[]>(`${baseUrl}`)
        .subscribe(
          games => resolve(games.map((game) => new Game(game))),
          error => reject(error));
    });
  }

  getPaginationOfAll(pageNumber: number, pageSize: number): Promise<PaginatedList<Game>> {
    return new Promise<PaginatedList<Game>>((resolve, reject) => {
      this.http.get<PaginatedList<Game>>(`${baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .subscribe(
          pageGames => {
            pageGames.value = pageGames.value.map((game) => new Game(game));
            resolve(new PaginatedList<Game>(pageGames));
          },
          error => reject(error));
    });
  }

  getPaginationOfFeatured(pageNumber: number, pageSize: number): Promise<PaginatedList<Game>> {
    return new Promise<PaginatedList<Game>>((resolve, reject) => {
      this.http.get<PaginatedList<Game>>(`${baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .subscribe(
          pageGames => {
            pageGames.value = pageGames.value.map((game) => new Game(game));
            resolve(new PaginatedList<Game>(pageGames));
          },
          error => reject(error));
    });
  }

  getById(gameId: number): Promise<Game> {
    return new Promise<Game>((resolve, reject) => {
      this.http.get<Game>(`${baseUrl}/${gameId}`)
        .subscribe(
          game => resolve(new Game(game)),
          error => reject(error));
    });
  }
}
