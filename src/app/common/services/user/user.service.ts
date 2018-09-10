import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../../models/user';

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
}
