import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_URLS } from 'src/app/_common/constants/routing';
import { AuthService } from '../auth/auth.service';
import { PaginatedList } from 'src/app/_common/models/paginated-list';
import { User } from 'src/app/_common/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  get(pageNumber?: number, pageSize?: number): Promise<PaginatedList<User> | Array<User>> {
    if (pageNumber && pageSize) {
      return new Promise<PaginatedList<User>>((resolve, reject) => {
        this.http.get<PaginatedList<User>>(`${API_URLS.users}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
          .subscribe(
            pageUsers => {
              pageUsers.value = pageUsers.value.map((user) => new User(user));
              resolve(new PaginatedList<User>(pageUsers));
            },
            error => reject(error));
      });
    } else {
      return new Promise<Array<User>>((resolve, reject) => {
        this.http.get<Array<User>>(`${API_URLS.users}`)
          .subscribe(
            users => resolve(users.map((user) => new User(user))),
            error => reject(error));
      });
    }
  }

  getById(userId: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.http.get<User>(`${API_URLS.users}/${userId}`)
        .subscribe(
          user => resolve(new User(user)),
          error => reject(error));
    });
  }

  getByUsername(username: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.http.get<User>(`${API_URLS.users}?username=${username}`)
        .subscribe(
          user => resolve(new User(user)),
          error => reject(error));
    });
  }

  update(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.put<boolean>(`${API_URLS.users}/${user.userId}`, user)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }

  patch(userId: number, userUpdate: Array<object>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.patch<void>(`${API_URLS.users}/${userId}`, userUpdate).subscribe(
        () => resolve(),
        error => reject(error));
    });
  }

  getImage(userId: number): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      this.http.get<File>(`${API_URLS.users}/${userId}/profile-image`)
        .subscribe(
          image => resolve(image),
          error => reject(error));
    });
  }

  updateImage(userId: number, image: File): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const data = new FormData();
      data.append('image', image);
      this.http.post<boolean>(`${API_URLS.users}/${userId}/profile-image`, data)
        .subscribe(
          success => resolve(success),
          error => reject(error));
    });
  }
}
