import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/common/models/user';
import { Group } from '../../models/group';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  getUserById(userId: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.http.get<User>(environment.API_URL + '/users/' + userId)
        .subscribe(
          user => resolve(user),
          error => reject(error));
    });
  }

  getUserByUsername(username: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.http.get<User>(environment.API_URL + '/users/?username=' + username)
        .subscribe(
          user => resolve(user),
          error => reject(error));
    });
  }

  updateUser(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.put<boolean>(environment.API_URL + '/users/' + user.userId, user)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  updateProfileImage(userId: number, image: File): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const data = new FormData();
      data.append('image', image);
      this.http.post<boolean>(environment.API_URL + '/users/' + userId + '/profile-image', data)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  getProfileImage(userId: number): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      this.http.get<File>(environment.API_URL + '/users/' + userId + '/profile-image')
        .subscribe(
          image => resolve(image),
          error => reject(error));
    });
  }

  getGroups(userId: number): Promise<Group[]> {
    return new Promise<Group[]>((resolve, reject) => {
      this.http.get<Group[]>(environment.API_URL + '/users/' + userId + '/groups')
        .subscribe(
          groups => resolve(groups),
          error => reject(error));
    });
  }

  getGames(userId: number): Promise<Game[]> {
    return new Promise<Game[]>((resolve, reject) => {
      this.http.get<Game[]>(environment.API_URL + '/users/' + userId + '/portfolio/games')
        .subscribe(
          games => resolve(games),
          error => reject(error));
    });
  }
}
