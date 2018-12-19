import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_PATH } from 'src/app/_common/constants/paths';
import { PaginatedList } from 'src/app/_common/models/paginated-list';
import { User } from 'src/app/_common/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient
  ) { }

  getById(userId: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.http.get<User>(`${API_PATH.users}/${userId}`)
        .subscribe(
          user => resolve(new User(user)),
          error => reject(error));
    });
  }

  getByUsername(username: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.http.get<User>(`${API_PATH.users}?username=${username}`)
        .subscribe(
          user => resolve(new User(user)),
          error => reject(error));
    });
  }

  getPaginationOfAll(pageNumber: number, pageSize: number): Promise<PaginatedList<User>> {
    return new Promise<PaginatedList<User>>((resolve, reject) => {
      this.http.get<PaginatedList<User>>(`${API_PATH.users}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .subscribe(
          pageUsers => {
            pageUsers.value = pageUsers.value.map((user) => new User(user));
            resolve(new PaginatedList<User>(pageUsers));
          },
          error => reject(error));
    });
  }

  update(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.put<boolean>(`${API_PATH.users}/${user.userId}`, user)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  getImage(userId: number): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      this.http.get<File>(`${API_PATH.users}/${userId}/profile-image`)
        .subscribe(
          image => resolve(image),
          error => reject(error));
    });
  }

  updateImage(userId: number, image: File): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const data = new FormData();
      data.append('image', image);
      this.http.post<boolean>(`${API_PATH.users}/${userId}/profile-image`, data)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }
}
