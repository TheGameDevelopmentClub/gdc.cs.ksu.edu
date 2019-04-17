import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import { API_URLS, APP_ROUTES } from 'src/app/_common/constants/routing';
import { StorageService } from 'src/app/_common/services/storage/storage.service';
import { AuthUser } from 'src/app/_common/models/user';
import { STORAGE_KEY_NAMES } from '../../constants/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticatedUser: AuthUser;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) { }

  isAuthenticated(): boolean {
    if (this.authenticatedUser == null) {
      return false;
    }
    return true;
  }

  public getUserAccessToken(): string {
    return this.storageService.getSessionStorageItem(STORAGE_KEY_NAMES.userAuthToken) || '';
  }

  loginCAS(service?: string): void {
    if (!service) {
      service = `${environment.APP_URL}${APP_ROUTES.login}`;
    }
    window.location.href = `${API_URLS.auth}/cas/login?service=${service}`;
  }

  validateCASTicket(ticket: string, service?: string): Promise<void> {
    if (!service) {
      service = `${environment.APP_URL}${APP_ROUTES.login}`;
    }
    return new Promise<void>((resolve, reject) => {
      this.http.get<AuthUser>(`${API_URLS.auth}/cas/validate?service=${service}&ticket=${ticket}`)
        .subscribe(
          user => {
            this.authenticatedUser = new AuthUser(user);
            resolve();
          },
          error => reject(error));
    });
  }

  validateToken(token: string) {
    return new Promise<void>((resolve, reject) => {
      if (!(token && token !== '')) {
        return reject({ status: 401 });
      }
      this.http.get<AuthUser>(`${API_URLS.auth}/validate/token`)
        .subscribe(
          user => {
            this.authenticatedUser = new AuthUser(user);
            resolve();
          },
          error => {
            reject(error);
          });
    });
  }

  logoutCAS(service?: string): void {
    if (!service) {
      service = `${environment.APP_URL}${APP_ROUTES.home}`;
    }
    this.clearUser();
    window.location.href = `${API_URLS.auth}/cas/logout?service=${service}`;
  }

  public clearUser() {
    this.storageService.removeSessionStorageItem(STORAGE_KEY_NAMES.userAuthToken);
    this.authenticatedUser = null;
  }
}
