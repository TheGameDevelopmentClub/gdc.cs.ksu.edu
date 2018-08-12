import { Injectable } from '@angular/core';

import { PortfolioItem } from '../../models/portfolio-item';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  ITEMS = [
    { creator: 'testguy1', title: 'testtitle1', description: 'testdescription1' },
    { title: 'testtitle2', description: 'testdescription2' },
  ];

  constructor() { }

  getAllItems(): Promise<PortfolioItem[]> {
    return new Promise<PortfolioItem[]>((resolve, reject) => {
      Promise.all(this.ITEMS.map((item) => {
        return PortfolioItem.create(item);
      }))
      .then((items) => resolve(items));
    });
  }
}
