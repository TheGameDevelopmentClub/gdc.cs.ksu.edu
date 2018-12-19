import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from 'src/app/_common/models/game';
import { GameService } from 'src/app/_common/services/game/game.service';

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

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.gameService.getById(this.gameId)
      .then(game => {
        this.game = game;
      })
      .catch(error => {
        this.game = null;
        this.errorOccurred = true;
      });
  }

  canEdit(): boolean {
    return true;
  }

  editGame(): void {
    this.edit.emit();
  }

  openMoreInfo(): void {
    window.open(this.game.hostUrl, '_blank');
  }
}
