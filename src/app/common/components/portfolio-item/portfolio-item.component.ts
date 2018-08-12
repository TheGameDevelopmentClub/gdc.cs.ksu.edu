import { Component, OnInit } from '@angular/core';

import { PortfolioItem } from 'src/app/common/models';

@Component({
  selector: 'ksu-gdc-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {
  item: PortfolioItem;

  constructor() { }

  ngOnInit() {
  }

}
