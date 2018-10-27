import { Component, OnInit } from '@angular/core';

import { OfficerService } from 'src/app/_common/services/officer/officer.service';
import { GameService } from 'src/app/_common/services/game/game.service';
import { Officer } from 'src/app/_common/models/officer';

@Component({
  selector: 'ksu-gdc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  officers: Map<string, Officer[]> = new Map<string, Officer[]>();

  categoryServices = {
    games: this.gameService
  };

  featuredLists = new Map([
    ['games', []]
  ]);

  featuredInfo = {
    category: '',
    pageNumber: 1,
    pageSize: 6
  };

  constructor(
    private officerService: OfficerService,
    private gameService: GameService
  ) { }

  ngOnInit() {
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

  getCategoryPage() {
    const category = this.featuredInfo.category;
    const service = this.categoryServices[category];
    service.getPaginationOfAll(this.featuredInfo.pageNumber, this.featuredInfo.pageSize)
      .then((items) => {
        this.resetFeaturedLists();
        this.featuredLists.set(category, items);
      });
  }

  resetFeaturedLists() {
    this.featuredLists.forEach((value, key, map) => {
      map.set(key, []);
    });
  }

  setFeaturedCategory(category: string) {
    this.featuredInfo.category = category;
    this.getCategoryPage();
  }

  setFeaturedPageNumber(pageNumber: number) {
    this.featuredInfo.pageNumber = pageNumber;
    this.getCategoryPage();
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
