import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PortfolioItem } from 'src/app/_common/models/portfolio';

const categories = {
  game: {
    path: 'games',
    id: 'gameId'
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

  info;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.info = categories[this.category];
  }

  openItemInfo() {
    this.router.navigate([`/portfolio/${this.info.path}/${this.item[this.info.id]}`]);
  }
}
