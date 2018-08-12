import { Component, OnInit } from '@angular/core';

import { PortfolioService } from 'src/app/common/services';
import { PortfolioItem } from 'src/app/common/models';

@Component({
  selector: 'ksu-gdc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items: PortfolioItem[];

  constructor(
    private portfolioService: PortfolioService
  ) { }

  ngOnInit() {
    this.getPortfolioItems();
  }

  getPortfolioItems() {
    this.portfolioService.getAllItems()
      .then((items) => this.items = items);
  }
}
