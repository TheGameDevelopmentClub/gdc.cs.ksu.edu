import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_PATH } from 'src/app/_common/constants/paths';
import { AuthService } from '../auth/auth.service';
import { Officer } from 'src/app/_common/models/officer';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  get(): Promise<Array<Officer>> {
    return new Promise((resolve, reject) => {
      this.http.get<Array<Officer>>(`${API_PATH.officers}`)
        .subscribe(
          officers => resolve(officers.map((officer) => new Officer(officer))),
          error => reject(error));
    });
  }

  getById(officerId: number): Promise<Officer> {
    return new Promise((resolve, reject) => {
      this.http.get<Officer>(`${API_PATH.officers}/${officerId}`)
        .subscribe(
          officer => resolve(new Officer(officer)),
          error => reject(error));
    });
  }

  getByPosition(position: string): Promise<Array<Officer>> {
    return new Promise<Array<Officer>>((resolve, reject) => {
      this.http.get<Array<Officer>>(`${API_PATH.officers}?position=${position}`)
        .subscribe(
          officers => resolve(officers.map((officer) => new Officer(officer))),
          error => reject(error));
    });
  }
}
