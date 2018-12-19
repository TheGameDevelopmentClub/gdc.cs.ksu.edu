import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { GameService } from 'src/app/_common/services/game/game.service';
import { NewGame } from 'src/app/_common/models/game';
import { User } from '../_common/models/user';

@Component({
  selector: 'ksu-gdc-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
  @ViewChild('gameCreateMessages') gameCreateMessages: InfoMessagesComponent;

  game = new NewGame();

  constructor(
    private dialogRef: MatDialogRef<CreateGameComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { user: User },
    private gameService: GameService
  ) { }

  ngOnInit() {
  }

  createGame() {
    this.gameService.create(this.data.user.userId, this.game)
      .then(() => {
        this.dialogRef.close(true);
      })
      .catch(error => {
        this.gameCreateMessages.showError('There was a problem creating your game.');
      });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
