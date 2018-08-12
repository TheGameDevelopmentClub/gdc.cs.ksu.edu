import { Injectable } from '@angular/core';

import { PortfolioItem } from '../../models/portfolio-item';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor() { }

  getAllItems(): Promise<PortfolioItem[]> {
    return new Promise<PortfolioItem[]>((resolve, reject) => {
    });
  }
}
