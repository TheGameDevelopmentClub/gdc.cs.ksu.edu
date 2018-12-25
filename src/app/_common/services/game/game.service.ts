import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_PATH } from 'src/app/_common/constants/paths';
import { PaginatedList } from 'src/app/_common/models/paginated-list';
import { NewGame, Game } from 'src/app/_common/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  create(userId: number, newGame: NewGame): Promise<Game> {
    return new Promise<Game>((resolve, reject) => {
      this.http.post<Game>(`${API_PATH.users}/${userId}/portfolio/games`, newGame)
        .subscribe(
          game => resolve(new Game(game)),
          error => reject(error));
    });
  }

  getById(gameId: number): Promise<Game> {
    return new Promise<Game>((resolve, reject) => {
      this.http.get<Game>(`${API_PATH.games}/${gameId}`)
        .subscribe(
          game => resolve(new Game(game)),
          error => reject(error));
    });
  }

  getPaginationOfAll(pageNumber: number, pageSize: number): Promise<PaginatedList<Game>> {
    return new Promise<PaginatedList<Game>>((resolve, reject) => {
      this.http.get<PaginatedList<Game>>(`${API_PATH.games}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
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
      this.http.get<PaginatedList<Game>>(`${API_PATH.games}/featured?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .subscribe(
          pageGames => {
            pageGames.value = pageGames.value.map((game) => new Game(game));
            resolve(new PaginatedList<Game>(pageGames));
          },
          error => reject(error));
    });
  }

  getPaginationOfAllByUserId(userId: number, pageNumber: number, pageSize: number): Promise<PaginatedList<Game>> {
    return new Promise<PaginatedList<Game>>((resolve, reject) => {
      this.http.get<PaginatedList<Game>>(`${API_PATH.users}/${userId}/portfolio/games?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .subscribe(
          pageGames => {
            pageGames.value = pageGames.value.map((game) => new Game(game));
            resolve(new PaginatedList<Game>(pageGames));
          },
          error => reject(error));
    });
  }

  update(game: Game): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.put<boolean>(`${API_PATH.groups}/${game.gameId}`, game)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  getImage(gameId: number): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      this.http.get<File>(`${API_PATH.groups}/${gameId}/thumbnail-image`)
        .subscribe(
          image => resolve(image),
          error => reject(error));
    });
  }

  updateImage(gameId: number, image: File): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const data = new FormData();
      data.append('image', image);
      this.http.post<boolean>(`${API_PATH.games}/${gameId}/thumbnail-image`, data)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  addCollaborator(userId: number, gameId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.put<boolean>(`${API_PATH.users}/${userId}/portfolio/games/${gameId}`, null)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  removeCollaborator(userId: number, gameId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.delete<boolean>(`${API_PATH.users}/${userId}/portfolio/games/${gameId}`)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }
}
