import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from 'src/app/_common/models/game';
import { GameService } from 'src/app/_common/services/game/game.service';

@Component({
  selector: 'ksu-gdc-game-profile',
  templateUrl: './game-profile.component.html',
  styleUrls: ['../game-profile.component.scss']
})
export class GameProfileComponent implements OnInit {
  gameNotFound: boolean;
  game: Game;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) { }

  ngOnInit() {
    const gameId = this.route.snapshot.params['gameId'];
    this.gameService.getById(gameId)
      .then(game => {
        this.game = game;
      })
      .catch(error => {
        this.game = null;
        this.gameNotFound = true;
      });
  }

  openMoreInfo() {
    window.open(this.game.itemUrl, '_blank');
  }
}
