import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/common/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }

  loginWithCAS(url: string): void {
    const service = (environment.APP_URL + url).split('?')[0];
    window.location.href = `${environment.API_URL}/auth/cas/login?service=${service}`;
  }

  validateCASTicket(url: string, ticket: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const service = (environment.APP_URL + url).split('?')[0];
      this.http.get<User>(`${environment.API_URL}/auth/cas/validate?service=${service}&ticket=${ticket}`)
        .subscribe(
          user => resolve(new User(user)),
          error => reject(error));
    });
  }

  logoutWithCAS(url: string): void {
    const service = (environment.APP_URL + url).split('?')[0];
    window.location.href = `${environment.API_URL}/auth/cas/logout?service=${service}`;
  }
}
