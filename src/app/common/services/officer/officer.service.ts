import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  officers = new Map([
    ['president', { name: 'Lauren Lynch' }],
    ['advisor', { name: 'Nathan Bean' }],
    ['vice president', { name: 'Carson Holt' }],
    ['treasurer', { name: 'Steven Zwahl' }],
    ['event manager', { name: 'Nathan McClain' }],
    ['industry liaison', { name: 'Jesse Molenda' }],
    ['website manager', { name: 'Dayton Taylor' }],
    ['social media manager', { name: 'Kyle Ingram' }]
  ]);

  constructor() { }

  getOfficerByPosition(position: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const officer = this.officers.get(position.toLowerCase());
      if (officer) {
        resolve(officer);
      } else {
        reject('No officer found for the \'' + position + '\' position');
      }
    });
  }
}
