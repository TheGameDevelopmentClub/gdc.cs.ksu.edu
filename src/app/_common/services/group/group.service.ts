import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { PaginatedList } from 'src/app/_common/models/paginated-list';
import { Group } from 'src/app/_common/models/group';
import { User } from 'src/app/_common/models/user';
import { Game } from 'src/app/_common/models/game';

const baseUrl = environment.API_URL + '/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Promise<Group[]> {
    return new Promise<Group[]>((resolve, reject) => {
      this.http.get<Group[]>(baseUrl)
        .subscribe(
          groups => resolve(groups.map((group) => new Group(group))),
          error => reject(error));
    });
  }

  getPaginationOfAll(pageNumber: number, pageSize: number): Promise<PaginatedList<Group>> {
    return new Promise<PaginatedList<Group>>((resolve, reject) => {
      this.http.get<PaginatedList<Group>>(`${baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .subscribe(
          pageGroups => {
            pageGroups.value = pageGroups.value.map((group) => new Group(group));
            resolve(new PaginatedList<Group>(pageGroups));
          },
          error => reject(error));
    });
  }

  getById(groupId: number): Promise<Group> {
    return new Promise<Group>((resolve, reject) => {
      this.http.get<Group>(`${baseUrl}/${groupId}`)
        .subscribe(
          group => resolve(new Group(group)),
          error => reject(error));
    });
  }

  getAllMembers(groupId: number): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      this.http.get<User[]>(`${baseUrl}/${groupId}/users`)
        .subscribe(
          users => resolve(users.map((user) => new User(user))),
          error => reject(error));
    });
  }

  getPaginationOfAllMembers(groupId: number, pageNumber: number, pageSize: number): Promise<PaginatedList<User>> {
    return new Promise<PaginatedList<User>>((resolve, reject) => {
      this.http.get<PaginatedList<User>>(`${baseUrl}/${groupId}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .subscribe(
          pageUsers => {
            pageUsers.value = pageUsers.value.map((user) => new User(user));
            resolve(new PaginatedList<User>(pageUsers));
          },
          error => reject(error));
    });
  }

  getAllGames(groupId: number) {
    return new Promise<Game[]>((resolve, reject) => {
      this.http.get<Game[]>(`${baseUrl}/${groupId}/porfolio/games`)
        .subscribe(
          games => resolve(games.map((game) => new Game(game))),
          error => reject(error));
    });
  }

  getPaginationOfAllGames(groupId: number, pageNumber: number, pageSize: number): Promise<PaginatedList<Game>> {
    return new Promise<PaginatedList<Game>>((resolve, reject) => {
      this.http.get<PaginatedList<Game>>(`${baseUrl}/${groupId}/portfolio/games?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .subscribe(
          pageGames => {
            pageGames.value = pageGames.value.map((game) => new Game(game));
            resolve(new PaginatedList<Game>(pageGames));
          },
          error => reject(error));
    });
  }
}
