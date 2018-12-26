import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_PATH } from 'src/app/_common/constants/paths';
import { PaginatedList } from 'src/app/_common/models/paginated-list';
import { NewGame, Game } from 'src/app/_common/models/game';
import { User } from 'src/app/_common/models/user';

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

  get(pageNumber: number | undefined, pageSize: number | undefined): Promise<PaginatedList<Game> | Array<Game>> {
    if (pageNumber && pageSize) {
      return new Promise<PaginatedList<Game>>((resolve, reject) => {
        this.http.get<PaginatedList<Game>>(`${API_PATH.games}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
          .subscribe(
            pageGames => {
              pageGames.value = pageGames.value.map((game) => new Game(game));
              resolve(new PaginatedList<Game>(pageGames));
            },
            error => reject(error));
      });
    } else {
      return new Promise<Array<Game>>((resolve, reject) => {
        this.http.get<Array<Game>>(`${API_PATH.games}`)
          .subscribe(
            games => resolve(games.map((game) => new Game(game))),
            error => reject(error));
      });
    }
  }

  getById(gameId: number): Promise<Game> {
    return new Promise<Game>((resolve, reject) => {
      this.http.get<Game>(`${API_PATH.games}/${gameId}`)
        .subscribe(
          game => resolve(new Game(game)),
          error => reject(error));
    });
  }

  getByFeatured(pageNumber: number | undefined, pageSize: number | undefined): Promise<PaginatedList<Game> | Array<Game>> {
    if (pageNumber && pageSize) {
      return new Promise<PaginatedList<Game>>((resolve, reject) => {
        this.http.get<PaginatedList<Game>>(`${API_PATH.games}/featured?pageNumber=${pageNumber}&pageSize=${pageSize}`)
          .subscribe(
            pageGames => {
              pageGames.value = pageGames.value.map((game) => new Game(game));
              resolve(new PaginatedList<Game>(pageGames));
            },
            error => reject(error));
      });
    } else {
      return new Promise<Array<Game>>((resolve, reject) => {
        this.http.get<Array<Game>>(`${API_PATH.games}/featured`)
          .subscribe(
            games => resolve(games.map((game) => new Game(game))),
            error => reject(error));
      });
    }
  }

  getByUserId(userId: number, pageNumber: number | undefined, pageSize: number | undefined)
    : Promise<PaginatedList<Game> | Array<Game>> {
    if (pageNumber && pageSize) {
      return new Promise<PaginatedList<Game>>((resolve, reject) => {
        this.http.get<PaginatedList<Game>>(`${API_PATH.users}/${userId}/portfolio/games?pageNumber=${pageNumber}&pageSize=${pageSize}`)
          .subscribe(
            pageGames => {
              pageGames.value = pageGames.value.map((game) => new Game(game));
              resolve(new PaginatedList<Game>(pageGames));
            },
            error => reject(error));
      });
    } else {
      return new Promise<Array<Game>>((resolve, reject) => {
        this.http.get<Array<Game>>(`${API_PATH.users}/${userId}/portfolio/games`)
          .subscribe(
            games => resolve(games.map((game) => new Game(game))),
            error => reject(error));
      });
    }
  }

  getCollaborators(gameId: number, pageNumber: number | undefined, pageSize: number | undefined)
    : Promise<PaginatedList<User> | Array<User>> {
    if (pageNumber && pageSize) {
      return new Promise<PaginatedList<User>>((resolve, reject) => {
        this.http.get<PaginatedList<User>>(`${API_PATH.games}/${gameId}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`)
          .subscribe(
            pageUsers => {
              pageUsers.value = pageUsers.value.map((user) => new User(user));
              resolve(new PaginatedList<User>(pageUsers));
            },
            error => reject(error));
      });
    } else {
      return new Promise<Array<User>>((resolve, reject) => {
        this.http.get<Array<User>>(`${API_PATH.games}/${gameId}/users`)
          .subscribe(
            users => resolve(users.map((user) => new User(user))),
            error => reject(error));
      });
    }
  }

  getNonCollaborators(gameId: number, pageNumber: number | undefined, pageSize: number | undefined)
    : Promise<PaginatedList<User> | Array<User>> {
    if (pageNumber && pageSize) {
      return new Promise<PaginatedList<User>>((resolve, reject) => {
        this.http.get<PaginatedList<User>>(`${API_PATH.games}/${gameId}/users?non=true&pageNumber=${pageNumber}&pageSize=${pageSize}`)
          .subscribe(
            pageUsers => {
              pageUsers.value = pageUsers.value.map((user) => new User(user));
              resolve(new PaginatedList<User>(pageUsers));
            },
            error => reject(error));
      });
    } else {
      return new Promise<Array<User>>((resolve, reject) => {
        this.http.get<Array<User>>(`${API_PATH.games}/${gameId}/users?non=true`)
          .subscribe(
            users => resolve(users.map((user) => new User(user))),
            error => reject(error));
      });
    }
  }

  update(game: Game): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.put<boolean>(`${API_PATH.games}/${game.gameId}`, game)
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

  addCollaborator(gameId: number, userId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.put<boolean>(`${API_PATH.users}/${userId}/portfolio/games/${gameId}`, null)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  removeCollaborator(gameId: number, userId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.delete<boolean>(`${API_PATH.users}/${userId}/portfolio/games/${gameId}`)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }
}
