import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import { API_PATH, APP_PATH } from 'src/app/_common/constants/paths';
import { AuthUser } from 'src/app/_common/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticatedUser: AuthUser;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  isAuthenticated(): boolean {
    if (this.authenticatedUser == null) {
      return false;
    }
    return true;
  }

  getApiToken(): string {
    if (this.isAuthenticated()) {
      return this.authenticatedUser.token;
    } else {
      return '';
    }
  }

  login(): void {
    const service = `${environment.APP_URL}${APP_PATH.login}`;
    window.location.href = `${API_PATH.auth.cas}/login?service=${service}`;
  }

  validate(ticket: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const service = `${environment.APP_URL}${APP_PATH.login}`;
      this.http.get<AuthUser>(`${API_PATH.auth.cas}/validate?service=${service}&ticket=${ticket}`)
        .subscribe(
          user => {
            this.authenticatedUser = new AuthUser(user);
            resolve();
          },
          error => reject(error));
    });
  }

  logout(): void {
    const service = `${environment.APP_URL}${APP_PATH.home}`;
    window.location.href = `${API_PATH.auth.cas}/logout?service=${service}`;
  }
}
