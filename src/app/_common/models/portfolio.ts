import { Router } from '@angular/router';

export abstract class PortfolioItem {
  public category: string;
  public title: string;

  abstract get id(): number;
  abstract get imageUrl(): string;

  navigateToProfilePage(router: Router): void {
    router.navigate([`/portfolio/${this.category}/${this.id}`]);
  }
}

export abstract class NewPortfolioItem {
  public userId: number;
}
