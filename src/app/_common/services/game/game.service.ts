import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_URLS } from 'src/app/_common/constants/routing';
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
    return new Promise<Game>((resolve, reject) => {
      newGame.userId = userId;
      this.http.post<Game>(`${API_URLS.games}`, newGame).subscribe(
        game => resolve(new Game(game)),
        error => reject(error));
    });
  }

  addCollaborator(gameId: number, userId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<boolean>(`${API_URLS.games}/${gameId}/users`, {
        userId: userId
      })
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  get(pageNumber?: number, pageSize?: number): Promise<PaginatedList<Game> | Array<Game>> {
    if (pageNumber && pageSize) {
      return new Promise<PaginatedList<Game>>((resolve, reject) => {
        this.http.get<PaginatedList<Game>>(`${API_URLS.games}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
          .subscribe(
            pageGames => {
              pageGames.value = pageGames.value.map((game) => new Game(game));
              resolve(new PaginatedList<Game>(pageGames));
            },
            error => reject(error));
      });
    } else {
      return new Promise<Array<Game>>((resolve, reject) => {
        this.http.get<Array<Game>>(`${API_URLS.games}`)
          .subscribe(
            games => resolve(games.map((game) => new Game(game))),
            error => reject(error));
      });
    }
  }

  getById(gameId: number): Promise<Game> {
    return new Promise<Game>((resolve, reject) => {
      this.http.get<Game>(`${API_URLS.games}/${gameId}`)
        .subscribe(
          game => resolve(new Game(game)),
          error => reject(error));
    });
  }

  getByFeatured(pageNumber?: number, pageSize?: number): Promise<PaginatedList<Game> | Array<Game>> {
    if (pageNumber && pageSize) {
      return new Promise<PaginatedList<Game>>((resolve, reject) => {
        this.http.get<PaginatedList<Game>>(`${API_URLS.games}/featured?pageNumber=${pageNumber}&pageSize=${pageSize}`)
          .subscribe(
            pageGames => {
              pageGames.value = pageGames.value.map((game) => new Game(game));
              resolve(new PaginatedList<Game>(pageGames));
            },
            error => reject(error));
      });
    } else {
      return new Promise<Array<Game>>((resolve, reject) => {
        this.http.get<Array<Game>>(`${API_URLS.games}/featured`)
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
        this.http.get<PaginatedList<Game>>(`${API_URLS.users}/${userId}/portfolio/games?pageNumber=${pageNumber}&pageSize=${pageSize}`)
          .subscribe(
            pageGames => {
              pageGames.value = pageGames.value.map((game) => new Game(game));
              resolve(new PaginatedList<Game>(pageGames));
            },
            error => reject(error));
      });
    } else {
      return new Promise<Array<Game>>((resolve, reject) => {
        this.http.get<Array<Game>>(`${API_URLS.users}/${userId}/portfolio/games`)
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
        this.http.get<PaginatedList<User>>(`${API_URLS.games}/${gameId}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`)
          .subscribe(
            pageUsers => {
              pageUsers.value = pageUsers.value.map((user) => new User(user));
              resolve(new PaginatedList<User>(pageUsers));
            },
            error => reject(error));
      });
    } else {
      return new Promise<Array<User>>((resolve, reject) => {
        this.http.get<Array<User>>(`${API_URLS.games}/${gameId}/users`)
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
        this.http.get<PaginatedList<User>>(`${API_URLS.games}/${gameId}/users?non=true&pageNumber=${pageNumber}&pageSize=${pageSize}`)
          .subscribe(
            pageUsers => {
              pageUsers.value = pageUsers.value.map((user) => new User(user));
              resolve(new PaginatedList<User>(pageUsers));
            },
            error => reject(error));
      });
    } else {
      return new Promise<Array<User>>((resolve, reject) => {
        this.http.get<Array<User>>(`${API_URLS.games}/${gameId}/users?non=true`)
          .subscribe(
            users => resolve(users.map((user) => new User(user))),
            error => reject(error));
      });
    }
  }

  update(game: Game): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.put<boolean>(`${API_URLS.games}/${game.gameId}`, game)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  patch(gameId: number, gameUpdate: Array<object>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.patch<void>(`${API_URLS.games}/${gameId}`, gameUpdate).subscribe(
        () => resolve(),
        error => reject(error));
    });
  }

  getImage(gameId: number): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      this.http.get<File>(`${API_URLS.games}/${gameId}/thumbnail-image`)
        .subscribe(
          image => resolve(image),
          error => reject(error));
    });
  }

  updateImage(gameId: number, image: File): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const data = new FormData();
      data.append('image', image);
      this.http.post<boolean>(`${API_URLS.games}/${gameId}/thumbnail-image`, data)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  removeCollaborator(gameId: number, userId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.delete<boolean>(`${API_URLS.games}/${gameId}/users/${userId}`)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }
}
