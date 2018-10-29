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

  featuredItemsLoading: boolean;
  featuredCategoryLoaded: boolean;
  featuredLists = new Map([
    ['games', []]
  ]);
  featuredInfo = {
    category: '',
    pageSize: 5,
    totalItemCount: 0
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

  changeFeaturedCategory(category: string) {
    this.featuredCategoryLoaded = false;
    this.featuredInfo.category = category;
    this.loadFeaturedPage(1);
  }
  changeFeaturedPage(pageNumber: number) {
    this.loadFeaturedPage(pageNumber);
  }
  loadFeaturedPage(pageNumber: number) {
    this.featuredItemsLoading = true;
    const service = this.categoryServices[this.featuredInfo.category];
    service.getPaginationOfFeatured(pageNumber, this.featuredInfo.pageSize)
      .then((items) => {
        this.resetFeaturedLists();
        this.featuredLists.set(this.featuredInfo.category, items.value);
        this.featuredInfo.totalItemCount = items.originalCount;
        this.featuredCategoryLoaded = true;
        this.featuredItemsLoading = false;
      });
  }

  private resetFeaturedLists() {
    this.featuredLists.forEach((value, key, map) => {
      map.set(key, []);
    });
  }

  getOfficer(position: string, index: number): Officer {
    position = position.toLowerCase();
    const officerList = this.officers.get(position);
    if (officerList) {
      const officer = officerList[index];
      return officer;
    }
  }
}
