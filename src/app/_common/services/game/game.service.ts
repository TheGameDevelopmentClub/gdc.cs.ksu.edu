import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_PATH } from 'src/app/_common/constants/paths';
import { AuthService } from '../auth/auth.service';
import { PaginatedList } from 'src/app/_common/models/paginated-list';
import { NewGame, Game } from 'src/app/_common/models/game';
import { User } from 'src/app/_common/models/user';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  create(userId: number, newGame: NewGame): Promise<Game> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getApiToken()
      })
    };
    return new Promise<Game>((resolve, reject) => {
      newGame.userId = userId;
      this.http.post<Game>(`${API_PATH.games}`, newGame, options).subscribe(
        game => resolve(new Game(game)),
        error => reject(error));
    });
  }

  addCollaborator(gameId: number, userId: number): Promise<boolean> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getApiToken()
      })
    };
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<boolean>(`${API_PATH.games}/${gameId}/users`, {
        userId: userId
      }, options)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  get(pageNumber?: number, pageSize?: number): Promise<PaginatedList<Game> | Array<Game>> {
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

  getByFeatured(pageNumber?: number, pageSize?: number): Promise<PaginatedList<Game> | Array<Game>> {
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

  getByUserId(userId: number, pageNumber?: number, pageSize?: number)
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

  getCollaborators(gameId: number, pageNumber?: number, pageSize?: number)
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

  getNonCollaborators(gameId: number, pageNumber?: number, pageSize?: number)
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
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getApiToken()
      })
    };
    return new Promise<boolean>((resolve, reject) => {
      this.http.put<boolean>(`${API_PATH.games}/${game.gameId}`, game, options)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  getImage(gameId: number): Promise<File> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getApiToken()
      })
    };
    return new Promise<File>((resolve, reject) => {
      this.http.get<File>(`${API_PATH.groups}/${gameId}/thumbnail-image`, options)
        .subscribe(
          image => resolve(image),
          error => reject(error));
    });
  }

  updateImage(gameId: number, image: File): Promise<boolean> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getApiToken()
      })
    };
    return new Promise<boolean>((resolve, reject) => {
      const data = new FormData();
      data.append('image', image);
      this.http.post<boolean>(`${API_PATH.games}/${gameId}/thumbnail-image`, data, options)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  removeCollaborator(gameId: number, userId: number): Promise<boolean> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getApiToken()
      })
    };
    return new Promise<boolean>((resolve, reject) => {
      this.http.delete<boolean>(`${API_PATH.games}/${gameId}/users/${userId}`, options)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }
}
