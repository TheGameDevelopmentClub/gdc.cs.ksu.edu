import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ApiToken } from './token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiToken: ApiToken;

  constructor(
    private http: HttpClient
  ) { }

  getApiToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.apiToken && !this.apiToken.expired) {
        return resolve(this.apiToken.token);
      }
      this.http.post<ApiToken>(`https://${environment.apiTokenReq_Domain}/oauth/token`, {
        client_id: environment.apiTokenReq_ClientId,
        client_secret: environment.apiTokenReq_ClientSecret,
        audience: environment.apiTokenReq_Audience,
        grant_type: 'client_credentials'
      }).subscribe(
        token => {
          this.apiToken = new ApiToken(token);
          resolve(this.apiToken.token);
        },
        error => {
          this.apiToken = null;
          reject(error);
        });
    });
  }
}
