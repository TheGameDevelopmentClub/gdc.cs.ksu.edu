import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PortfolioItem } from 'src/app/_common/models/portfolio';

const categories = {
  games: {
    path: 'games',
    idRef: 'gameId'
  }
};

@Component({
  selector: 'ksu-gdc-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {
  @Input() category: string;
  @Input() item: PortfolioItem;

  itemInfo: { path: any; idRef: string; };

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.itemInfo = categories[this.category];
  }

  openItemInfo() {
    this.router.navigate([`/portfolio/${this.itemInfo.path}/${this.item[this.itemInfo.idRef]}`]);
  }
}
