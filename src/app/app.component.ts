import { Component, OnInit } from '@angular/core';

import { PortfolioService, OfficerService } from 'src/app/common/services';
import { PortfolioItem, Officer } from 'src/app/common/models';

@Component({
  selector: 'ksu-gdc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items: PortfolioItem[];
  officers: Map<string, Officer[]> = new Map<string, Officer[]>();

  constructor(
    private officerService: OfficerService,
    private portfolioService: PortfolioService
  ) { }

  ngOnInit() {
    this.portfolioService.getAllItems()
      .then((items) => this.items = items);
    this.officerService.getAllOfficers()
      .then((officers) => this.setOfficersMap(officers));
  }

  private setOfficersMap(officers: Officer[]): void {
    officers.forEach((officer) => {
      const position = officer.position.toLowerCase();
      const officerList = this.officers.get(position);
      if (!officerList) {
        this.officers.set(position, [officer]);
      } else {
        officerList.push(officer);
        this.officers.set(position, officerList);
      }
    });
  }

  getOfficer(position: string, listIndex: number): Officer {
    position = position.toLowerCase();
    const officerList = this.officers.get(position);
    if (officerList) {
      if (listIndex < officerList.length) {
        const officer = officerList[listIndex];
        this.officers.set(position, officerList);
        return officer;
      }
    }
  }
}
