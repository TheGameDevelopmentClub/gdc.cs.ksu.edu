import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/common/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  getUserById(id: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.http.get<User>(environment.API_URL + '/users/' + id)
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
      this.http.put<boolean>(environment.API_URL + '/users/' + user.id, user)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  updateProfileImage(id: number, image: File): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const data = new FormData();
      data.append('image', image);
      this.http.post<boolean>(environment.API_URL + '/users/' + id + '/profile-image', data)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  getProfileImage(id: number): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      this.http.get<File>(environment.API_URL + '/users/' + id + '/profile-image')
        .subscribe(
          image => resolve(image),
          error => reject(error));
    });
  }
}
