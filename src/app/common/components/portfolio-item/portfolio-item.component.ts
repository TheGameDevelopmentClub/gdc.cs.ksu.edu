import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { PortfolioItem } from 'src/app/common/models';
import { PortfolioItemModalComponent } from 'src/app/common/components/portfolio-item-modal/portfolio-item-modal.component';

@Component({
  selector: 'ksu-gdc-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {
  item: PortfolioItem;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openOfficerModal() {
    this.dialog.open(PortfolioItemModalComponent, {
      width: '500px',
      data: {
        item: this.item
      }
    });
  }
}
