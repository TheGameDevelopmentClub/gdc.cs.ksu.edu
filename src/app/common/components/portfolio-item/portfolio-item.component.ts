import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksu-gdc-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {
  title: string;

  constructor() { }

  ngOnInit() {
  }

}
