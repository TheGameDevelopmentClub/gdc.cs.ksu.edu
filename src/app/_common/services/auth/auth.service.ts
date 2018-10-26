import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/_common/services/storage/storage.service';
import { AuthUser } from 'src/app/_common/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  isLoggedIn(): boolean {
    return true;
  }

  loginWithCAS(url: string): void {
    const service = (environment.APP_URL + url).split('?')[0];
    window.location.href = `${environment.API_URL}/auth/cas/login?service=${service}`;
  }

  validateCASTicket(url: string, ticket: string): Promise<AuthUser> {
    return new Promise<AuthUser>((resolve, reject) => {
      const service = (environment.APP_URL + url).split('?')[0];
      this.http.get<AuthUser>(`${environment.API_URL}/auth/cas/validate?service=${service}&ticket=${ticket}`)
        .subscribe(
          user => resolve(new AuthUser(user)),
          error => reject(error));
    });
  }

  logoutWithCAS(url: string): void {
    const service = (environment.APP_URL + url).split('?')[0];
    window.location.href = `${environment.API_URL}/auth/cas/logout?service=${service}`;
  }
}
