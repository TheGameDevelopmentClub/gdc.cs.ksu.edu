import { Injectable } from '@angular/core';

import { PortfolioItem } from './portfolio-item';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  ITEMS = new Map([
    ['', { title: '' }]
  ]);

  constructor() { }

  getAllItems(): Promise<PortfolioItem[]> {
    return new Promise<PortfolioItem[]>((resolve, reject) => {
    });
  }
}
