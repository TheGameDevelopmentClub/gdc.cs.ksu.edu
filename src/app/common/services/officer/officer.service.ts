import { Injectable } from '@angular/core';

import { Officer } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  OFFICERS = new Map([
    ['president', { name: 'Lauren Lynch', imageUrl: 'assets/images/officers/lauren-lynch.png' }],
    ['advisor', { name: 'Nathan Bean', imageUrl: 'assets/images/officers/nathan-bean.png' }],
    ['vice president', { name: 'Carson Holt', imageUrl: 'assets/images/officers/carson-holt.png' }],
    ['treasurer', { name: 'Steven Zwahl' }],
    ['event manager', { name: 'Nathan McClain', imageUrl: 'assets/images/officers/nathan-mcclain.png' }],
    ['industry liaison', { name: 'Jesse Molenda', imageUrl: 'assets/images/officers/jesse-molenda.png' }],
    ['website manager', { name: 'Dayton Taylor', imageUrl: 'assets/images/officers/dayton-taylor.png' }],
    ['social media manager', { name: 'Kyle Ingram', imageUrl: 'assets/images/officers/kyle-ingram.png' }]
  ]);

  constructor() { }

  getAllOfficers(): Promise<Officer[]> {
    return new Promise((resolve, reject) => {
    });
  }

  getOfficerByPosition(position: string): Promise<Officer> {
    return new Promise<any>((resolve, reject) => {
      const officer = this.OFFICERS.get(position.toLowerCase());
      if (officer) {
        Officer.create(position, officer)
          .then((newOfficer) => resolve(newOfficer))
          .catch((error) => reject(error));
      } else {
        reject('No officer found for the \'' + position + '\' position');
      }
    });
  }
}
