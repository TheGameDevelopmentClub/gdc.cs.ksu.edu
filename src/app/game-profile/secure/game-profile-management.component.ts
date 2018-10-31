import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { InfoMessagesComponent } from 'src/app/_common/components/info-messages/info-messages.component';
import { FileUploadComponent } from 'src/app/_common/components/file-upload/file-upload.component';
import { ImageLoaderDirective } from 'src/app/_common/directives/image-loader/image-loader.directive';
import { GameService } from 'src/app/_common/services/game/game.service';
import { Game } from 'src/app/_common/models/game';

@Component({
  selector: 'ksu-gdc-game-profile-management',
  templateUrl: './game-profile-management.component.html',
  styleUrls: ['../game-profile.component.scss']
})
export class GameProfileManagementComponent implements OnInit {
  @ViewChild('profileUpdateMessages') profileUpdateMessages: InfoMessagesComponent;
  @ViewChild('gamesUpdateMessages') gamesUpdateMessages: InfoMessagesComponent;
  @ViewChild('infoForm') infoForm: NgForm;
  @ViewChild(FileUploadComponent) imageUploader: FileUploadComponent;
  @ViewChild(ImageLoaderDirective) profileImage: ImageLoaderDirective;

  isValidated: boolean;
  gameNotFound: boolean;
  game: Game;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit() {
  }

  uploadImage(image: File) {
    this.imageUploader.isProcessing = true;
    this.gameService.updateImage(this.game.gameId, image)
      .then(() => {
        this.profileUpdateMessages.showSuccess('Your thumbnail image has been updated.');
        this.imageUploader.isProcessing = false;
        this.profileImage.reload();
      })
      .catch(error => this.profileUpdateMessages.showError('There was a problem updating the thumbnail image.'));
  }

  updateGameInfo() {
    this.gameService.update(this.game)
      .then(() => {
        this.infoForm.form.markAsPristine();
        this.infoForm.form.markAsUntouched();
        this.profileUpdateMessages.showSuccess('Info has been updated.');
      })
      .catch(error => {
        this.profileUpdateMessages.showError('There was a problem updating the info.');
      });
  }
}
