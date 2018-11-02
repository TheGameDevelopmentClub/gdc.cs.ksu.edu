import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { API_PATH } from 'src/app/_common/constants/paths';
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
    window.location.href = `${API_PATH.authCASBaseUrl}/login?service=${service}`;
  }

  validateCASTicket(url: string, ticket: string): Promise<AuthUser> {
    return new Promise<AuthUser>((resolve, reject) => {
      const service = (environment.APP_URL + url).split('?')[0];
      this.http.get<AuthUser>(`${API_PATH.authCASBaseUrl}/validate?service=${service}&ticket=${ticket}`)
        .subscribe(
          user => resolve(new AuthUser(user)),
          error => reject(error));
    });
  }

  logoutWithCAS(url: string): void {
    const service = (environment.APP_URL + url).split('?')[0];
    window.location.href = `${API_PATH.authCASBaseUrl}/logout?service=${service}`;
  }
}
