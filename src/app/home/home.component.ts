import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OfficerService } from 'src/app/_common/services/officer/officer.service';
import { GameService } from 'src/app/_common/services/game/game.service';
import { Officer } from 'src/app/_common/models/officer';
import { PortfolioItem } from 'src/app/_common/models/portfolio';

@Component({
  selector: 'ksu-gdc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  officers = new Map<string, Officer[]>();

  featuredCategory = '';
  featuredLoading: boolean;
  featuredLoaded: boolean;
  categories = {
    games: {
      service: this.gameService,
      pageSize: 3,
      totalItemCount: 0,
      list: []
    }
  };

  constructor(
    private router: Router,
    private officerService: OfficerService,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.officerService.get()
      .then((officers) => this.setOfficersMap(officers));
  }

  private setOfficersMap(officers: Officer[]) {
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
  getOfficer(position: string, index: number): Officer {
    position = position.toLowerCase();
    const officerList = this.officers.get(position);
    if (officerList) {
      const officer = officerList[index];
      return officer;
    }
  }

  changeFeaturedCategory(category: string) {
    this.featuredLoaded = false;
    this.featuredCategory = category;
    this.loadFeaturedPage(1);
  }
  loadFeaturedPage(pageNumber: number) {
    this.featuredLoading = true;
    this.categories[this.featuredCategory].service.getByFeatured(pageNumber, this.categories[this.featuredCategory].pageSize)
      .then((items) => {
        this.categories[this.featuredCategory].list = items.value;
        this.categories[this.featuredCategory].totalItemCount = items.total;
        this.featuredLoaded = true;
        this.featuredLoading = false;
      });
  }

  navigateToPortfolioItemPage(item: PortfolioItem): void {
    item.navigateToProfilePage(this.router);
  }
}
