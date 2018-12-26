import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_common/services/auth/auth.service';
import { GameService } from 'src/app/_common/services/game/game.service';
import { Game } from 'src/app/_common/models/game';
import { User } from 'src/app/_common/models/user';

@Component({
  selector: 'ksu-gdc-game-profile',
  templateUrl: './game-profile.component.html',
  styleUrls: ['../game-profile.component.scss']
})
export class GameProfileComponent implements OnInit {
  @Input() gameId: number;
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();

  errorOccurred: boolean;
  game: Game;

  canEdit: boolean;

  categories = {
    users: {
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
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.gameService.getById(this.gameId)
      .then(game => {
        this.game = game;
        this.loadPage('users', 1);
        if (this.authService.isAuthenticated()) {
          this.gameService.getByUserId(this.authService.authenticatedUser.userId)
            .then((games: Array<Game>) => {
              console.log(games.findIndex(g => g.id === game.id));
              this.canEdit = games.findIndex(g => g.id === game.id) > -1;
            })
            .catch((err) => {
              this.canEdit = false;
            });
        } else {
          this.canEdit = false;
        }
      })
      .catch(error => {
        this.game = null;
        this.errorOccurred = true;
      });
  }

  loadPage(category: string, pageNumber: number) {
    this.categories[category].loading = true;
    this.categories[category].service.getCollaborators(this.game.gameId, pageNumber, this.categories[category].pageSize)
      .then((items) => {
        this.categories[category].list = items.value;
        this.categories[category].totalItemCount = items.total;
        this.categories[category].loaded = true;
        this.categories[category].loading = false;
      })
      .catch();
  }

  editGame(): void {
    this.edit.emit();
  }

  openMoreInfo(): void {
    window.open(this.game.hostUrl, '_blank');
  }

  navigateToMemberProfile(user: User) {
    user.navigateToProfilePage(this.router);
  }
}
