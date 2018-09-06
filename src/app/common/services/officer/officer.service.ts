import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Officer } from 'src/app/common/models/officer';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {

  constructor(
    private http: HttpClient
  ) { }

  getAllOfficers(): Promise<Officer[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Officer[]>(environment.API_URL + '/officers').subscribe(officers => {
        resolve(officers);
      }, error => reject(error));
    });
  }

  getOfficersByPosition(position: string): Promise<Officer[]> {
    return new Promise<any>((resolve, reject) => {
      this.http.get<Officer[]>(environment.API_URL + '/officers?position=' + position).subscribe(officers => {
        resolve(officers);
      }, error => reject(error));
    });
  }
}
