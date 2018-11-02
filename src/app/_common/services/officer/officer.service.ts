import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_PATH } from 'src/app/_common/constants/paths';
import { Officer } from 'src/app/_common/models/officer';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Promise<Officer[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Officer[]>(`${API_PATH.officersBaseUrl}`)
      .subscribe(
        officers => resolve(officers.map((officer) => new Officer(officer))),
        error => reject(error));
    });
  }

  getById(officerId: number): Promise<Officer> {
    return new Promise((resolve, reject) => {
      this.http.get<Officer[]>(`${API_PATH.officersBaseUrl}/${officerId}`)
      .subscribe(
        officer => resolve(new Officer(officer)),
        error => reject(error));
    });
  }

  getByPosition(position: string): Promise<Officer[]> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<Officer[]>(`${API_PATH.officersBaseUrl}?position=${position}`)
      .subscribe(
        officers => resolve(officers.map((officer) => new Officer(officer))),
        error => reject(error));
    });
  }
}
