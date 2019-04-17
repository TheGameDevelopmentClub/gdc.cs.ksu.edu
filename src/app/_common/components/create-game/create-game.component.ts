import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { GameService } from 'src/app/_common/services/game/game.service';
import { NewGame } from 'src/app/_common/models/game';
import { User } from 'src/app/_common/models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ksu-gdc-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
  @ViewChild(InfoMessagesComponent) gameCreateMessages: InfoMessagesComponent;

  createGameGroup: FormGroup;
  titleControl: FormControl;
  descriptionControl: FormControl;
  hostUrlControl: FormControl;

  constructor(
    private dialogRef: MatDialogRef<CreateGameComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { user: User },
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.titleControl = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    this.descriptionControl = new FormControl('', [Validators.maxLength(1000)]);
    this.hostUrlControl = new FormControl('', [Validators.maxLength(2000)]);
    this.createGameGroup = new FormGroup({
      title: this.titleControl,
      description: this.descriptionControl,
      hostUrl: this.hostUrlControl
    });
  }

  formIsValid(): boolean {
    return this.createGameGroup.touched && this.createGameGroup.valid;
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  createGame() {
    const newGame = new NewGame();
    newGame.title = this.titleControl.value;
    if (this.descriptionControl.value.length > 0) {
      newGame.description = this.descriptionControl.value;
    }
    if (this.hostUrlControl.value.length > 0) {
      newGame.hostUrl = this.hostUrlControl.value;
    }
    this.gameService.create(this.data.user.userId, newGame)
      .then(() => {
        this.dialogRef.close(true);
      })
      .catch((error: HttpErrorResponse) => {
        if (error.status === 400) {
          const modelError = error.error;
          this.createGameGroup.markAsUntouched();
          this.gameCreateMessages.showError(modelError.errorMessages[0]);
        } else {
          this.gameCreateMessages.showError('There was a problem creating your game.');
        }
      });
  }
}
