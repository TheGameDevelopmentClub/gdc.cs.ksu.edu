import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_common/services/auth/auth.service';
import { UserService } from 'src/app/_common/services/user/user.service';
import { GameService } from 'src/app/_common/services/game/game.service';
import { User } from 'src/app/_common/models/user';
import { PortfolioItem } from 'src/app/_common/models/portfolio';

@Component({
  selector: 'ksu-gdc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['../user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userId: number;
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();

  errorOccurred: boolean;
  user: User;

  categories = {
    games: {
      service: this.gameService,
      loading: false,
      loaded: false,
      pageSize: 6,
      totalItemCount: 0,
      list: []
    }
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.userService.getById(this.userId)
      .then(user => {
        this.user = user;
        this.loadPage('games', 1);
      })
      .catch(error => {
        this.user = null;
        this.errorOccurred = true;
      });
  }

  loadPage(category: string, pageNumber: number) {
    this.categories[category].loading = true;
    this.categories[category].service.getByUserId(this.user.userId, pageNumber, this.categories[category].pageSize)
      .then((items) => {
        this.categories[category].list = items.value;
        this.categories[category].totalItemCount = items.total;
        this.categories[category].loaded = true;
        this.categories[category].loading = false;
      });
  }

  canEdit(): boolean {
    return this.authService.isAuthenticated() && this.authService.authenticatedUser.userId === this.userId;
  }

  editUser(): void {
    this.edit.emit();
  }

  navigateToPortfolioItemPage(item: PortfolioItem): void {
    item.navigateToProfilePage(this.router);
  }
}
