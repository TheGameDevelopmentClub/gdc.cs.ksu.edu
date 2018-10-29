import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Officer } from 'src/app/_common/models/officer';

const baseUrl = environment.API_URL + '/officers';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Promise<Officer[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Officer[]>(`${baseUrl}`)
      .subscribe(
        officers => resolve(officers.map((officer) => new Officer(officer))),
        error => reject(error));
    });
  }

  getById(officerId: number): Promise<Officer> {
    return new Promise((resolve, reject) => {
      this.http.get<Officer[]>(`${baseUrl}/${officerId}`)
      .subscribe(
        officer => resolve(new Officer(officer)),
        error => reject(error));
    });
  }

  getByPosition(position: string): Promise<Officer[]> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<Officer[]>(`${baseUrl}?position=${position}`)
      .subscribe(
        officers => resolve(officers.map((officer) => new Officer(officer))),
        error => reject(error));
    });
  }
}
