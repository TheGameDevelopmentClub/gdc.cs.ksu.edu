import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { GameService } from 'src/app/_common/services/game/game.service';
import { NewGame } from 'src/app/_common/models/game';
import { User } from '../_common/models/user';

@Component({
  selector: 'ksu-gdc-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
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
      });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
