import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { PaginatedList } from 'src/app/_common/models/paginated-list';
import { User } from 'src/app/_common/models/user';
import { Group } from 'src/app/_common/models/group';
import { Game } from 'src/app/_common/models/game';

const baseUrl = environment.API_URL + '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      this.http.get<User[]>(baseUrl)
        .subscribe(
          users => resolve(users.map((user) => new User(user))),
          error => reject(error));
    });
  }

  getPaginationOfAll(pageNumber: number, pageSize: number): Promise<PaginatedList<User>> {
    return new Promise<PaginatedList<User>>((resolve, reject) => {
      this.http.get<PaginatedList<User>>(`${baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .subscribe(
          pageUsers => {
            pageUsers.value = pageUsers.value.map((user) => new User(user));
            resolve(new PaginatedList<User>(pageUsers));
          },
          error => reject(error));
    });
  }

  getById(userId: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.http.get<User>(`${baseUrl}/${userId}`)
        .subscribe(
          user => resolve(new User(user)),
          error => reject(error));
    });
  }

  getByUsername(username: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.http.get<User>(`${baseUrl}?username=${username}`)
        .subscribe(
          user => resolve(new User(user)),
          error => reject(error));
    });
  }

  update(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.put<boolean>(`${baseUrl}/${user.userId}`, user)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  getProfileImage(userId: number): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      this.http.get<File>(`${baseUrl}/${userId}/profile-image`)
        .subscribe(
          image => resolve(image),
          error => reject(error));
    });
  }

  updateProfileImage(userId: number, image: File): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const data = new FormData();
      data.append('image', image);
      this.http.post<boolean>(`${baseUrl}/${userId}/profile-image`, data)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  getGroups(userId: number): Promise<Group[]> {
    return new Promise<Group[]>((resolve, reject) => {
      this.http.get<Group[]>(`${baseUrl}/${userId}/groups`)
        .subscribe(
          groups => resolve(groups.map((group) => new Group(group))),
          error => reject(error));
    });
  }

  getGames(userId: number): Promise<Game[]> {
    return new Promise<Game[]>((resolve, reject) => {
      this.http.get<Game[]>(`${baseUrl}/${userId}/portfolio/games`)
        .subscribe(
          games => resolve(games.map((game) => new Game(game))),
          error => reject(error));
    });
  }
}
