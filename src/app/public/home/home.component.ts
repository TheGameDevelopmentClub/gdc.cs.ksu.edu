import { Component, OnInit } from '@angular/core';

import { OfficerService } from 'src/app/common/services/officer/officer.service';
import { PortfolioService } from 'src/app/common/services/portfolio/portfolio.service';
import { Officer } from 'src/app/common/models/officer';
import { Game } from 'src/app/common/models/game';

@Component({
  selector: 'ksu-gdc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  games: Game[];
  officers: Map<string, Officer[]> = new Map<string, Officer[]>();

  constructor(
    private officerService: OfficerService,
    private portfolioService: PortfolioService
  ) { }

  ngOnInit() {
    this.portfolioService.getNumberOfGames(6)
      .then((games) => this.games = games);
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

  getOfficer(position: string, listNumber: number): Officer {
    position = position.toLowerCase();
    listNumber--;
    const officerList = this.officers.get(position);
    if (officerList) {
      const officer = officerList[listNumber];
      return officer;
    }
  }
}
