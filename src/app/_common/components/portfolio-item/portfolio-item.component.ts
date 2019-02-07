import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PortfolioItem } from 'src/app/_common/models/portfolio';

@Component({
  selector: 'ksu-gdc-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {
  @Input() item: PortfolioItem;
  @Output() clicked: EventEmitter<PortfolioItem> = new EventEmitter<PortfolioItem>();

  constructor() { }

  ngOnInit() {
  }

  handleClick() {
    this.clicked.emit(this.item);
  }
}
